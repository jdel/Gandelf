# Gandelf

This is a Graylog Extended Log Format to Slack / Seq bridge for docker containers.

Check out [the GELF format here](http://docs.graylog.org/en/2.1/pages/gelf.html).

Read about how to [specify it for your docker containers here](https://docs.docker.com/engine/admin/logging/overview/#/gelf-options).

You could spin up a singleton instance and point your Docker containers at it, or you 
could add it to a `docker-compose.yml` and deploy it alongside your container.

To log to Slack, set the `SLACK_API_TOKEN` environment variable with the [Slack Bot API token](https://api.slack.com/bot-users) for your Slack team.

To log to SEQ, set the `SEQ_URL` environment variable to point to your Seq instance. 

Here's an example of a docker-compose.yml using it:

```
version: '2'
services:
 play:
  restart: always
  image: my-production-container
  container_name: play
  ports:
   - "80:80"
  logging:
   driver: gelf
   options:
    gelf-address: "udp://127.0.0.1:12201"
  links:
   - gandelf
 gandelf:
  restart: always
  image: sitapati/gandelf
  container_name: gandelf
  ports:
   - "12201:12201/udp"
  environment:
   - SLACK_API_TOKEN=xoxb-XXXXXXXXXXX-XXXXXXXXXXXXXX
   - SEQ_URL=http://my-seq.southeastasia.cloudapp.azure.com
   ```
