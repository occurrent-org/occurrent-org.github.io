---
title: "How Occurrent is layered"
description: "The layers of Occurrent, what your code works with in each, and where to start."
sidebar:
  order: 2
---

Occurrent is built in layers. Each layer is built from the one below it, and you can use any of them directly. You don't have to pick one layer for the whole application. A projection can read CloudEvents straight from a subscription while the rest of the application works with domain events.

| Layer | Your code works with | Main parts |
|:------|:---------------------|:-----------|
| [0: CloudEvents](/docs/layer-0/cloudevents/) | [`CloudEvent`](/docs/layer-0/cloudevents/) | [EventStore](/docs/layer-0/eventstore/), [subscriptions](/docs/layer-0/subscriptions/), [event store queries](/docs/layer-0/eventstore-queries/) |
| [1: Domain events](/docs/layer-1/cloudevent-conversion/) | Your own domain event types | [CloudEventConverter](/docs/layer-1/cloudevent-conversion/), [ApplicationService](/docs/layer-1/application-service/), [DomainEventQueries](/docs/layer-1/querying-domain-events/), [Subscriptions](/docs/layer-1/subscribing-to-domain-events/), [views and projections](/docs/layer-1/views/), [snapshots](/docs/layer-1/snapshots/), [sagas](/docs/layer-1/sagas/) |
| [2: Spring Boot](/docs/spring-boot/) | Annotations and configuration properties | The [Spring Boot starter](/docs/spring-boot/starter/), and annotations such as [`@Subscription`](/docs/spring-boot/subscription-annotations/), [`@Projection`](/docs/spring-boot/projection-annotation/) and [`@Saga`](/docs/spring-boot/saga-annotation/) |
| [3: Your own framework](/docs/layer-3/your-own-framework/) (experimental) | Whatever your framework exposes | Built from layer 1 parts |

**Layer 0** is where everything is a CloudEvent. The [event store](/docs/layer-0/eventstore/) reads and writes CloudEvents, and [subscriptions](/docs/layer-0/subscriptions/) deliver them. Nothing at this layer knows about your domain events. Use it directly when you want full control over how events are represented, or when you write infrastructure such as a forwarder or an audit log that should work for any event.

**Layer 1** adds a [`CloudEventConverter`](/docs/layer-1/cloudevent-conversion/), which maps your domain events to CloudEvents and back. The [`ApplicationService`](/docs/layer-1/application-service/) uses it to load a stream as domain events, call your domain function, and write the new events back. The other parts at this layer, such as [`DomainEventQueries`](/docs/layer-1/querying-domain-events/), [`Subscriptions`](/docs/layer-1/subscribing-to-domain-events/), [projections](/docs/layer-1/projections/) and [sagas](/docs/layer-1/sagas/), also work with domain events and use the converter underneath. Most applications should start here.

**Layer 2** is Spring Boot support. The [starter](/docs/spring-boot/starter/) wires up the event store, a subscription model and a converter for you, and annotations such as [`@Subscription`](/docs/spring-boot/subscription-annotations/), [`@Projection`](/docs/spring-boot/projection-annotation/) and [`@Saga`](/docs/spring-boot/saga-annotation/) register handlers without any wiring code. It is more convenient, but more happens behind your back. The annotations are built on the layer 1 API, so you can drop down a layer when you need more control. Everything Spring Boot adds lives in the [Spring Boot](/docs/spring-boot/) section. The layer 0 and layer 1 pages show code that runs without it, and end with a short note when a feature has a Spring Boot form.

**Layer 3** is a framework built from layer 1 parts, shaped after your own business. Occurrent doesn't ship a finished one. See [Building Your Own Framework](/docs/layer-3/your-own-framework/).

Some things are not part of a layer:

* **Your domain model.** Commands, events, state and [deciders](/docs/overview/deciders/) have no dependency on Occurrent at all. See [Your Domain Model](/docs/overview/commands/).
* **The storage and the programming model.** Each layer comes for several stores (MongoDB through the native driver or Spring Data, in-memory) and in a blocking and a reactive (Project Reactor) flavor. A Spring Data MongoDB event store is still layer 0. It uses Spring as a library, which is not the same as the Spring Boot support in layer 2.
* **[Dynamic Consistency Boundary](/docs/layer-0/dcb-event-store/) (DCB).** It is a capability of the event store that the other layers build on. The [`DcbEventStore`](/docs/layer-0/dcb-event-store/) is layer 0, the [DCB application service and deciders](/docs/layer-1/dcb-with-domain-events/) are layer 1, and [`@DcbSubscription`](/docs/layer-1/dcb-with-domain-events/) is layer 2.
* **[Infrastructure](/docs/stores/choosing-an-event-store/)** that everything uses, such as [retry](/docs/stores/retry/) and [deadlines](/docs/stores/deadlines/).

Where to start:

* With Spring Boot, start with [Getting started with Spring Boot](/docs/overview/getting-started-spring-boot/) and read about the layer 1 parts as you use them.
* Without Spring Boot, start with a [CloudEventConverter](/docs/layer-1/cloudevent-conversion/) and the [ApplicationService](/docs/layer-1/application-service/). [Getting Started](/docs/overview/getting-started/) walks through it.
* Use [layer 0](/docs/layer-0/cloudevents/) directly when you need control over the CloudEvents themselves, or when you write your own component on top of the event store.
