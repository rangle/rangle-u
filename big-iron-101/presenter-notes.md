# rangle-academy-big-iron

Course on concepts related to production-level nodeJS server deployments.

# Outline

## Intro

Distributed systems and the web.

## Basic Concepts of Production deployments

Brief Intro to '4 pillars':

(don't say much, just introduce the terms. We'll circle back later)

* Scalability
* Elasticity
* Availability
* Diagnosability

## Exercise: Practical Example

Present a nodeJS/Express server running on a single VM in the cloud
* We start getting more and more hits (transactions per second)
  (can use a script to drive this and demo what happens to the box)
* Requests start taking a noticeable amount of time
* Eventually it stops responding completely (timeouts?)

Get suggestions from the class:
  how can we find out what's happening?
    * possible suggestion: ssh into the box, run `top`
  what can we do?
    * possible suggestion: beefier box?
      * pros/cons?
      * more memory: can node take advantage of it?
      * more CPUs: can node take advantage of them?
    * possible suggestion: more boxes
      * how to distribute requests across boxes?

## Spiel: Scalability Concepts

What do we mean when we talk about scalability?
* It's our ability large numbers of simultaneous requests?
* It's our ability to handle large amounts of I/O?
* It's our ability how do these things without spending lots of money.

Scalability: understanding how our system will perform as we get more and more users.

Ideal: a system that scales linearly - costs increase at the same rate as the increased amount of traffic.
Reality: costs usually increase faster than this as the user space grows. But we can get pretty close.

* concepts:
  * I/O
  * Latency
  * CPU usage
  * Memory usage
  * Concurrency
  * Horizontal vs. Vertical Scalability

## Exercise: Horizontal Scalability Example
* Present a diagram of a server with several machines behind a load balancer
(diagram, explanation of what a load balancer does - round-robin etc.)
* Take the crappy app from the first exercise, spin up two VMs and an ELB and show it can handle
approx twice the load.

## Elasticity

Horizontal Scalability is nice because it allows us to be 'elastic' (with the right infrastructure).

Definition: Elasticity: how easy it is to scale servers up and down

### Case Study: E-Commerce and the Black Friday problem.

In the early days of Amazon, they had a problem.
* 3/4 of the year, traffic on amazon.com site was low
  * could be served by a small fleet of servers.
  * $
* Between black friday and Christmas, traffic spikes massively
  * needed a substantially larger fleet of servers to handle the spike
  * $$$

Get suggestions from the class: How to handle this?
  * Suggestion: provision based on worst-case traffic
    * Pro: site won't go down at most lucrative time of year
    * Con: you're spending too much money the rest of the year
  * Suggestion: provision based on average-case traffic
    * Pro: more reasonable costs
    * Con: if the site goes down at xmas you're losing a ton of potential business.

Amazon moved all their servers off physical hardware and onto fleets of generic
VMs.

This allows them to easily allocate/deallocate vms to running services at a
moment's notice.

Their Idle capacity they sell to other people to use (utility computing, infrastructure
as a service).

This was the birth of the 'cloud' and AWS.

Cloud vms are 'elastic': you can scale up and down with demand.

## Availability:
* How often does our system go down?
  * Note this is orthogonal to scalability: there are some low-scale systems
  that can never go down
  * For other systems it's less important
  * Clarify these requirements with the customer's IT people.

* Why do systems go down?
  * Not just failures in your software
  * Machines in data centers die
  * VMs reboot
  * Hard drives fail
  * Construction site across the road from a data center tore a fiber optic
  cable (this actually happened to me once)
  * Toilet overflows in a datacenter and floods a rack of servers.

* How to handle it?
  * Redundancy: avoiding single points of failure
    * High-availability systems avoid single points of failure
    * The other argument for load balancers: redundancy
    * What if the load balancer goes down?
    * Talk about AWS's concept of 'availability zones'
  * Make sure your software can restart quickly
    * in the event of an exception
    * or a machine reboot
    * or some other process killing it

* Consider the splash damage of outages
  * E.g If the cache goes down, how much damage will it do?
  * If one data center goes down, are we still able to run from the others?
  * Can be hard to predict

* What's the impact of updating the system's software?
  * Talk about ZDU (zero-downtime-updates)
    * Remove one node from load-balancer, update it, swap it back in
    * Site keeps running for the duration
    * Not possible for all types of updates: consider DB/Cache/API schema
    changes!

#### Case Study: Common pitfalls
* No log rotation: HDD fills up and boom at 2am 3 weeks from now.
* VM gets rebooted, server doesn't start back up again. Don't notice until
this happens to all the nodes in the ELB at 2 am 3 months from now.

## Diagnosability
* How do we know if it's (still) working?
* Monitoring
  * Response times of requests
  * Machine health (CPU, mem usage, etc.)
  * Services like new relic can help with this
  * AWS has a good suite of machine health tools (cloudwatch)
* Alarms
  * Get alerted to problems before they happen
    * e.g. mem usage increasing past a certain threshold, etc.
* Logging
  * If possible send your logs to a service that can stream them, allow admins
  to review and search them
  * At minimum rotate any log files on the server machines.
* Auditing
  * Some applications may require that you log specific data for compliance and
  audit purposes.
* Error handling
  * How to handle errors from downstream services in particular
* Health Checks
  * Shallow - "my server is up"
  * Deep - "my server and all its dependencies are up"
  * Some load balancers will use shallow health checks to direct traffic
  away from unhealthy nodes.

### Deep Dive - Basic monitoring stuff from Heroku

## Configurability
* Separate config and code
* One codebase, multiple deployment environments

# Resources
* [12-factor apps in plain English](http://www.clearlytech.com/2014/01/04/12-factor-apps-plain-english/)
