<div align="center">
	<img src="public/brand.svg" width="200" height="200">
	<h1>DompetIn</h1>
	<p>
		<b>A web app for recording manual and automatic financial transactions</b>
	</p>
	<br>
</div>


## What's this?
<img src="public/mockup/dashboard.svg">

It's a hobby project for me, in a certain condition I need a website application to record my financial transactions both manually and automatically.
That's why the idea to create DompetIn was created.

<br>

## Features
Priority features include:
* `Auth`
  Sign In, Sign Up
* `Transactions` (manually only)
  Add, Read, Update, Delete, Assign Category
* `Transaction Categories`
  Add, Read, Update, Delete

## Installation

First, Clone this repository:

```shell
git clone git@github.com:nsmle/dompet.in-web.git
```

Second, Copy environment vars, and edit that
```shell
cp .env.example .env.local
```

Next, install the dependencies:
```shell
yarn install
```

Next, run the development server:
```shell
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project was created with [Next.js v15 | App Router](https://nextjs.org) and [Typescript](https://www.typescriptlang.org/), as well as the project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) with [Sequelize v7 (alpha)](https://sequelize.org/docs/v7/) orm database.
And the project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## What's next ?
Once all priority features are included, this project will be closed to the public, the repository will be made private or even deleted. Consider copying a copy of this repository if you are interested in this project, or feel free to contact me.

## License 
Licensed under the terms of the [GNU-3.0 license](#GPL-3.0-1-ov-file).