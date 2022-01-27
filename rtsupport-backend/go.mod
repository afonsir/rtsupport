module github.com/afonsir/rtsupport/rtsupport-backend

go 1.17

require github.com/gorilla/websocket v1.4.2

require github.com/mitchellh/mapstructure v1.4.3

require (
	github.com/golang/protobuf v1.3.4
	github.com/hailocab/go-hostpool v0.0.0-20160125115350-e80d13ce29ed
	github.com/opentracing/opentracing-go v1.1.0
	github.com/sirupsen/logrus v1.0.6
	golang.org/x/crypto v0.0.0-20200302210943-78000ba7a073
	golang.org/x/net v0.0.0-20190404232315-eb5bcb51f2a3
	golang.org/x/sys v0.0.0-20191120155948-bd437916bb0e
	gopkg.in/cenkalti/backoff.v2 v2.2.1
	gopkg.in/rethinkdb/rethinkdb-go.v6 v6.2.1
)
