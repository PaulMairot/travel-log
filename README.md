# COMEM+ Travel Log Ionic Starter Project

This project was created following these [setup instructions](https://github.com/MediaComem/comem-travel-log-ionic-setup).

## Installation

Clone this project, then:

```bash
git clone https://github.com/MediaComem/comem-travel-log-ionic-starter.git
cd comem-travel-log-ionic-starter
npm ci
```

You must also put the configuration file in place the first time:

```bash
cp src/environments/environment.sample.ts src/environments/environment.ts
```

Fill in appropriate values in `src/environments/environment.ts`.

> If you intend to do a production build, you'll need to copy again the file:
>
> ```bash
> cp src/environments/environment.sample.ts src/environments/environment.prod.ts
> ```
>
> and fill in the appropriate values.
>
> **Be sure to set the `production` property to `true`!**

## Usage

Run in development mode in the browser with:

```bash
cd comem-travel-log-ionic-starter
ionic serve
```
