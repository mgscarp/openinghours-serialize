/**
 * Define variables
 */

var dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    dayCodes = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/**
 * Expose `serialize`
 */

module.exports = serialize;

/**
 * Serialize data to text
 *
 * @param  {Array} data
 * @param  {Object} options
 * @return {String}
 */

function serialize (data, options) {
    if (options && options.dayNames)
        dayNames = options.dayNames;

    var result = [];

    var i = 0,
        l = data.length;

    var dayOfWeek,
        nthDay, dayCode;

    var hours, hrs;

    var o = {};

    while (i < l) {
        dayOfWeek = data[i].dayOfWeek;

        nthDay  = dayNames.indexOf(dayOfWeek);
        dayCode = dayCodes[nthDay];

        hours = [];

        while (data[i] && data[i].dayOfWeek == dayOfWeek) {
            var range = data[i].opens + '-' + data[i].closes;
            hours.push(range);
            i++;
        }

        hrs = hours.join(' ');

        if (o.hrs == hrs) {
            // append dayCode to list
            o.days.push(dayCode);
            // update last record
            result[0] = stringify(o);
        } else {
            // store new data
            o = {
                hrs: hrs,
                days: [dayCode]
            }
            // add new record
            result.unshift(stringify(o));
        }
    }

    function stringify(obj) {
        return zip(o.days) + ' ' + o.hrs;
    }

    return result
        .reverse()
        .join('; ');
}

/**
 * Minify days list to range
 *
 * @param  {Array|String} days
 * @return {String}
 */

function zip(days) {
    if (typeof days == 'string')
        days = days.split(',');

    var result = [];

    var current = 0,
        i = 0,
        next;

    var nth, delta;

    // break array to sequentive lists
    do {
        nth = dayCodes.indexOf(days[current]);
        delta = nth - current;

        var arr = [];

        do {
            arr.push(days[current + i]);
            next = current + i++;
        } while (days[++next] && days[next] == dayCodes[next + delta]);

        current = next;

        result.push(arr);

    } while (days[current])


    return result.reduce(function(res, arr){
        var str;

        switch (arr.length) {
            case 1:
            case 2:
                str = arr.join();
                break;
            default:
                str = arr.shift() + '-' + arr.pop();
        }

        res.push(str);

        return res;
    }, []).join(',');
}
