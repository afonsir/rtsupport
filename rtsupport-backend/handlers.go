package main

import (
	"github.com/mitchellh/mapstructure"
	r "gopkg.in/rethinkdb/rethinkdb-go.v6"
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
