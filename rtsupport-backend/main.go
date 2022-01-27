package main

import (
	"log"
	"net/http"

	r "gopkg.in/rethinkdb/rethinkdb-go.v6"
)

type Channel struct {
	Id   string `json:"id"   rethinkdb:"id,omitempty"`
	Name string `json:"name" rethinkdb:"name"`
}

type User struct {
	Id   string `rethinkdb:"id,omitempty"`
	Name string `rethinkdb:"name"`
}

func main() {
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "rtsupport",
		Username: "admin",
		Password: "kljdasf123j3432890",
	})

	if err != nil {
		log.Panic(err.Error())
	}

	router := NewRouter(session)

	router.Handle("channel-add", addChannel)
	router.Handle("channel-subscribe", subscribeChannel)
	router.Handle("channel-unsubscribe", unsubscribeChannel)

	router.Handle("user-edit", editUser)

	http.Handle("/", router)
	http.ListenAndServe(":4000", nil)
}
