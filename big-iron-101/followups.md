# Followup Workshops (deep dives, more hands-on, maybe build something).

## Practical Scalability in NodeJS

### Keeping your Server Stateless - Data Management Strategies
- sharing data between instances
- updating shared data
* sessions
* temporary distributed stores (e.g. redis, elasticache)
* persistent distributed stores (e.g. postgres, mongo, dynamodb, s3, ...)

### High Latency Requests in NodeJS
* Show how lengthy requests can really mess with the event queue
* Can be due to CPU-bound logic
  * Suggestion: put expensive tasks in a cron job on a different machine
* Can be due to outgoing request timeouts
  * Suggestion: configure node's outgoing HTTP stack to have low timeouts, high connection count thresholds

### Service assets vs. serving APIs
### Clustering

## Planning for High-Availablity in NodeJS

* daemonization (forever, etc.)
* fast restart
* start server on boot
* easy machine replacement
* zero-downtime deployments

### Deep Dive - Handling downstream service errors
* Retrying certain classes of downstream errors automatically can help
* Be careful which types of error (generally for network errors or idempotent
(GET) requests)
* Importance of retry limits and exponential backoff to avoid
  * cascading failure
  * the "kick it while it's down" effect

## Caching Techniques

* Use cases
  * in front of DB,
  * in front of $-per-call API,
  * in front of slow API
  * edge caching
  * data sharing between nodes
* Caveat: cache invalidation
  * As soon as you cache, think about when the data is no longer valid
  * Also think about running out of space
  * Can be a hard problem in general
  * Common strategies:
    * Write-through cache
    * LRU
    * TTL

## Monitoring.

### Deep Dive - CloudWatch Alarms?

### Deep Dive - Example using New Relic?