FROM ruby:3.3.6

RUN gem install bundler -v 2.5.22 --no-document
WORKDIR /srv/jekyll
