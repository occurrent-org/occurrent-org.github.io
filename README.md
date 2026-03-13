# occurrent.org

This repo contains the source code for [occurrent.org](https://occurrent.org).

Pull requests for adding tutorials and fixing errors in docs are very welcome.

## Run locally

The site now uses a modern GitHub Pages-compatible Jekyll stack and should run locally with a normal Ruby and Bundler setup.

### Recommended: Native Ruby

Requirements:

- Ruby `3.3.6`
- Bundler `2.5.22` or compatible Bundler 2.5.x

Using `rbenv`:

```bash
rbenv install 3.3.6
rbenv local 3.3.6
gem install bundler -v 2.5.22
```

Start the site with:

```bash
bundle install
bundle exec jekyll serve --host 0.0.0.0 --port 4000 --livereload --livereload-port 35730
```

Or use the helper script:

```bash
./run_mac.sh
```

Then open [http://localhost:4000](http://localhost:4000). Live reload uses port `35730` to avoid collisions with the default Jekyll live reload port.

### Optional: Docker

Requirements:

- Docker Desktop or another Docker runtime

Start the site with:

```bash
./run_docker.sh
```

Then open [http://localhost:4000](http://localhost:4000). Live reload uses port `35730` to avoid collisions with the default Jekyll live reload port.

The Docker helper:

- builds a local image from `Dockerfile` based on `ruby:3.3.6`
- installs gems with modern Bundler
- starts Jekyll on port `4000`

### Windows

A legacy Windows helper script is still available:

```bat
run_win.bat
```
