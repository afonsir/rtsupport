package main

import (
	"fmt"

	"github.com/mitchellh/mapstructure"
	r "gopkg.in/rethinkdb/rethinkdb-go.v6"
)

const (
	ChannelStop = iota
	UserStop
	MessageStop
)

func addChannel(client *Client, data interface{}) {
	var channel Channel

	err := mapstructure.Decode(data, &channel)

	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}

	go func() {
		err = r.Table("channels").
			Insert(channel).
			Exec(client.session)

		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func subscribeChannel(client *Client, data interface{}) {
	stop := client.NewStopChannel(ChannelStop)
	result := make(chan r.ChangeResponse)

	cursor, err := r.Table("channels").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)

	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}

	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()

	go func() {
		for {
			select {
			case <-stop:
				cursor.Close()
				return

			case change := <-result:
				// insert
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"channel-add", change.NewValue}
					fmt.Println("channel added")
				}
			}
		}
	}()
}

func unsubscribeChannel(client *Client, data interface{}) {
	client.StopForKey(ChannelStop)
}

func editUser(client *Client, data interface{}) {
	var user User

	err := mapstructure.Decode(data, &user)

	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}

	client.userName = user.Name

	go func() {
		_, err := r.Table("users").
			Get(client.id).
			Update(user).
			RunWrite(client.session)

		if err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()
}

func subscribeUser(client *Client, data interface{}) {
	go func() {
		stop := client.NewStopChannel(UserStop)

		cursor, err := r.Table("users").
			Changes(r.ChangesOpts{IncludeInitial: true}).
			Run(client.session)

		if err != nil {
			client.send <- Message{"error", err.Error()}
		}

		changeFeedHelper(cursor, "user", client.send, stop)
	}()
}

func unsubscribeUser(client *Client, data interface{}) {
	client.StopForKey(UserStop)
}

func changeFeedHelper(cursor *r.Cursor, changeEventName string,
	send chan<- Message, stop <-chan bool) {

	change := make(chan r.ChangeResponse)
	cursor.Listen(change)

	for {
		eventName := ""
		var data interface{}

		select {
		case <-stop:
			cursor.Close()
			return

		case val := <-change:
			if val.NewValue != nil && val.OldValue == nil {
				eventName = changeEventName + "-" + "add"
				data = val.NewValue

			} else if val.NewValue == nil && val.OldValue != nil {
				eventName = changeEventName + "-" + "remove"
				data = val.OldValue

			} else if val.NewValue != nil && val.OldValue != nil {
				eventName = changeEventName + "-" + "edit"
				data = val.OldValue
			}

			send <- Message{eventName, data}
		}
	}
}
