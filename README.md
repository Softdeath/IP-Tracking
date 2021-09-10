# Simple IP Tracker

This tool made in NodeJS lets you know all the relevant information about an IP. 

# How Does This Tool Work?

This application makes HTTP Requests to IP Stack's API. Which responses with a large information about an IP depending on which plan you've purchased. (There is a FREE plan)

# Requirements

- NodeJS > 14.x

# Installation

```
$ git clone https://github.com/Softdeath/IP-Tracking.git
$ cd IP-Tracking
$ npm install
```

## Notes:

- Create an account in [IP Stack](https://ipstack.com)
- Get your API Key
- Paste it into a file named `.env`. (Use the format of example.env)

# Usage

```
$ node dist/app --ip <IP to track> --language en
```

- --ip, -i :: The IP to track (required)
- --language, -l :: Language to translate (not required) [Valid Options: en, es, de, fr, ja, pt-br, ru, zh]
