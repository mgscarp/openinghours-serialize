# OpeningHours Serialize

Serialize `OpeningHours` to textual representation.

## Installation

~~~sh
$ npm install mgscarp-openinghours-serialize --save
~~~

## Usage

~~~js
var serialize = require('mgscarp-openinghours-serialize');

var data = [
        { from: 600, to: 840 },
        { from: 2040, to: 2280 },
        { from: 3480, to: 3720 }
    ];

// returns 'Mo-We 10:00-14:00'
serialize(data); 
~~~

## Tests

Run tests with Mocha

~~~sh
$ make test
~~~

### Check

- <https://schema.org/openingHours>
- <https://github.com/mgscarp/openinghours>
