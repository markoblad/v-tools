"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const s = require("underscore.string");
const pluralize = require("pluralize");
const moment = require("moment");
const math = require("mathjs");
const accounting = require("accounting");
const vn2w = require("v-number-to-words");
class VTools {
    static get ROUND_TO_DEFAULT() {
        return 7;
    }
    static get ALPHABET() {
        return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    }
    static get ROMAN_MAP() {
        return {
            '1000': 'M',
            '900': 'CM',
            '500': 'D',
            '400': 'CD',
            '100': 'C',
            '90': 'XC',
            '50': 'L',
            '40': 'XL',
            '10': 'X',
            '9': 'IX',
            '5': 'V',
            '4': 'IV',
            '1': 'I',
        };
    }
    static get ORDERED_ROMAN_MAP() {
        return [
            [1000, 'M'],
            [900, 'CM'],
            [500, 'D'],
            [400, 'CD'],
            [100, 'C'],
            [90, 'XC'],
            [50, 'L'],
            [40, 'XL'],
            [10, 'X'],
            [9, 'IX'],
            [5, 'V'],
            [4, 'IV'],
            [1, 'I']
        ];
    }
    static get PERIOD_FREQUENCY_LEGEND() {
        return {
            '1': 'One year',
            '2': 'Six months',
            '3': 'Four months',
            '4': 'Three months',
            '6': 'Two months',
            '8': 'Month and a half',
            '12': 'One month',
            '24': 'Half month',
            '26': 'Two weeks',
            '52': 'Week',
            '364': 'One day',
            '365': 'One day',
            '366': 'One day',
        };
    }
    // public static get PERIOD_FREQUENCY_TO_PERIOD(): {} { return {
    // '1': '1.years',
    // '2': '6.months',
    // '3': '4.months',
    // '4': '3.months',
    // '12': '1.months',
    // '26': '2.weeks',
    // '52': '1.weeks',
    //   };
    // }
    static get ANNUAL_FREQUENCY_TO_LABEL() {
        return {
            '1': 'Annual',
            '4': 'Quarterly',
            '12': 'Monthly',
        };
    }
    // public static get ANNUAL_FREQUENCY_TO_TIME(): {} { return {
    // '1': '1.year',
    // '4': '3.months',
    // '12': '1.month',
    //   };
    // }
    static get PERIOD_FREQ_OPTIONS() {
        return {
            'Annual': 1,
            'Semi-Annual': 2,
            'Quarter': 4,
            'Month': 8,
        };
    }
    static get ALL_FISCAL_PERIODS() {
        return [
            'N/A',
            'FY', 'FYTD',
            'Q1', 'Q2', 'Q3', 'Q4',
            'H1', 'H2',
            '9M',
            'T1M', 'T3M', 'T9M', 'TSM', 'TTM',
            'M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11', 'M12',
            'ASOF'
        ];
    }
    static get PERIODLY() {
        return [
            'annually',
            'semi-annually',
            'quarterly',
            'bi-monthly',
            'monthly',
            'semi-monthly',
            'bi-weekly',
            'weekly',
            'daily',
            'hourly'
        ];
    }
    static get PERIODS() {
        return [
            'years',
            'semi-years',
            'quarters',
            'bi-months',
            'months',
            'semi-months',
            'bi-weeks',
            'weeks',
            'days',
            'hours',
            'minutes',
            'seconds',
        ];
    }
    static get SINGULAR_PERIODS() {
        return _.map(VTools.PERIODS, (i) => { return pluralize(i, 1); });
    }
    static isBlank(value) {
        if (value == null || value == undefined) {
            return true;
        }
        else if (typeof value === 'string' || typeof value === 'number') {
            return s.isBlank(value.toString());
        }
        else if (VTools.isArray(value)) {
            return value.length === 0;
        }
        else if (VTools.isObject(value)) {
            return Object.getOwnPropertyNames(value).length === 0;
        }
        else {
            return s.isBlank(VTools.makeString(value));
        }
    }
    static isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    static isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
    static isDate(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }
    static isString(value) {
        return (typeof (value) === 'string');
    }
    static isNumeric(value) {
        return !VTools.isObject(value) && !VTools.isArray(value) && !isNaN(parseFloat(value)) && isFinite(value);
    }
    static isTrue(value) {
        if (value === undefined || value === null) {
            return false;
        }
        let arr = ['yes', 'y', 'true', 't', '1', 'on'];
        return (_.includes(arr, value.toString().toLowerCase()));
    }
    static isFalse(value) {
        if (value === undefined || value === null) {
            return false;
        }
        let arr = ['no', 'n', 'false', 'f', '0', 'off'];
        return (_.includes(arr, value.toString().toLowerCase()));
    }
    static isTrueOrFalse(value) {
        return VTools.isTrue(value) || VTools.isFalse(value);
    }
    static eachSlice(value, size = 1, callback) {
        for (let i = 0, l = value.length; i < l; i += size) {
            callback(value.slice(i, i + size));
        }
    }
    static arraySum(value) {
        if (value && VTools.isArray(value)) {
            return _.reduce(value, function (memo, num) {
                let numType = typeof num;
                return ((num && (numType === 'string' || numType === 'number') && (isFinite(num) || num === Infinity)) ? memo + parseFloat(num) : memo);
            }, 0);
        }
        else {
            return 0;
        }
    }
    static arrayItemCounts(array) {
        return _.reduce(array || [], function (memo, e) {
            memo[e] = memo[e] || 0;
            memo[e] += 1;
            return memo;
        }, {});
    }
    static hasRangeOverlap(range1, range2, options = {}) {
        if (VTools.isTrue(options['sort'])) {
            range1 = range1.sort();
            range2 = range2.sort();
        }
        return range1 && range2 && range1.length === 2 && range2.length === 2 &&
            (VTools.isTrue(options['strict']) ?
                ((range1[0] !== range1[1]) && (((range1[0] < range2[1]) && (range1[1] > range2[0])) ||
                    ((range2[0] < range1[1]) && (range2[1] > range1[0])))) :
                ((range1[0] <= range2[1]) && (range2[0] <= range1[1])));
    }
    static makeString(value) {
        if (value == null)
            return '';
        return '' + value;
    }
    static coerceToString(value) {
        return _.some(['[object Undefined]', '[object Null]'], (t) => {
            return Object.prototype.toString.call(value) === t;
        }) ? '' : value.toString();
    }
    static pluralize(value) {
        return pluralize.apply(this, arguments);
    }
    static reverse(value) {
        return value.split('').reverse().join('');
    }
    static ambipluralize(value) {
        if (s.isBlank(value))
            return value;
        value = VTools.pluralize(value);
        if ((/ies$/i).test(value)) {
            value = value.replace(/ies$/i, '(ies)');
            // } else if (value.test(/es$/i)) {
            // value = value.replace(/es$/i, '(es)')
        }
        else if ((/s$/i).test(value)) {
            value = value.replace(/s$/i, '(s)');
        }
        return value;
    }
    static normalizeString(value) {
        return (value || '').toString()
            .replace(/[\s\'\.\,\:\;\/\(\)\[\]\-\#\@\!\$\%\^\&\*\+\=\"\?\<\>\~\`]+/g, '')
            .replace(/^\d/, function (m) { return 'pre_' + m[0]; });
    }
    static parseZeroPaddedInt(value) {
        if (s.isBlank(value) || value === 0 || value === '0' || s.isBlank(value.toString().replace(/0/g, ''))) {
            return 0;
        }
        value = value.toString();
        let firstNonZeroIndex = value.search(/(?!0)/);
        return parseInt(value.slice(firstNonZeroIndex, value.length), 10);
    }
    static stringToDecimal(s) {
        // return parseFloat((s || 0).toSting().trim().replace(/[\,\$\%\-{2,}]*/g, ''))
        // return parseFloat((s || 0).toSting().trim()
        //   .replace(/[\,\$\%]*/g, '').replace(/\p{Sc}/ug, ''))
        return parseFloat((s || 0).toString().trim().replace(/[^\d\.]/g, ''));
    }
    static stringToInteger(s) {
        return parseInt(VTools.stringToDecimal(s).toString(), 10);
    }
    static parseBigOrZero(value) {
        return math.bignumber(VTools.isNumeric(value) ? value : 0.0);
    }
    static variableCurrency(number, currency) {
        number = VTools.makeString(number);
        if (VTools.roundToDecimal(parseFloat(number), 2) === parseFloat(number)) {
            return accounting.formatMoney(number, currency);
        }
        else {
            let str = VTools.decimalToStr(parseFloat(number));
            let precision = str ? (str.split('.')[1] || '').length : 2;
            if (precision === 1)
                precision = 2;
            return accounting.formatMoney(number, currency, precision);
        }
    }
    static variableInteger(number) {
        number = VTools.makeString(number);
        if (!VTools.isNumeric(number))
            return number;
        if (VTools.roundToDecimal(parseFloat(number), 0) === parseFloat(number)) {
            return accounting.formatNumber(number);
        }
        else {
            let decimalStr = VTools.decimalToStr(parseFloat(number));
            if (!decimalStr)
                return decimalStr;
            let pieces = decimalStr.split('.');
            return accounting.formatNumber((pieces[0] || '0')) + '.' + (pieces[1] || '00');
        }
    }
    static noExponentsStr(number) {
        number = VTools.makeString(number);
        let f = parseFloat(number);
        let data = String(f).split(/[eE]/);
        if (data.length === 1) {
            return data[0];
        }
        let z = '', sign = f < 0 ? '-' : '', str = data[0].replace('.', ''), mag = Number(data[1]) + 1;
        if (mag < 0) {
            z = sign + '0.';
            while (mag++)
                z += '0';
            return z + str.replace(/^\-/, '');
        }
        mag -= str.length;
        while (mag--)
            z += '0';
        return str + z;
    }
    static decimalToStr(number, roundTo = VTools.ROUND_TO_DEFAULT) {
        number = VTools.makeString(number);
        let f = parseFloat(number);
        let str = VTools.noExponentsStr(f);
        roundTo = VTools.isNumeric(roundTo) ? parseInt(roundTo.toString(), 10) : VTools.ROUND_TO_DEFAULT;
        if (str === 'NaN')
            return null;
        let firstNonZeroIndex = (VTools.reverse(str).split('')).findIndex((element) => {
            return (parseInt(element, 10) !== 0 || element === '.');
        });
        if (firstNonZeroIndex === -1)
            return '0.00';
        str = str.substring(0, (str.length + firstNonZeroIndex));
        if (!(/\./).test(str) || (_.last(str.split('.')) || '').length < 3 || str.slice(-1) === '.') {
            str = parseFloat(str).toFixed(2);
        }
        else if (!(/\./).test(str) || (_.last(str.split('.')) || '').length > 7 || str.slice(-1) === '.') {
            str = VTools.roundToDecimal(parseFloat(str), roundTo).toString();
        }
        return str;
    }
    static decimalToPercStr(number) {
        return (VTools.decimalToStr(parseFloat(math.multiply(VTools.parseBigOrZero(number), math.bignumber(100.0)).toString())) || '0.0') + '%';
    }
    static percToDecimal(number) {
        return parseFloat(math.divide(VTools.parseBigOrZero(number), math.bignumber(100.0)).toString());
    }
    static percentThreshold(number, verbose) {
        if (!VTools.isNumeric(number))
            return number;
        number = VTools.makeString(number);
        let result;
        if (parseFloat(number) === 50) {
            result = 'a majority';
        }
        else if (VTools.roundToDecimal(parseFloat(number), 2) === 66.66 ||
            VTools.roundToDecimal(parseFloat(number), 2) === 66.67) {
            result = 'at least two-thirds';
        }
        else if (VTools.roundToDecimal(parseFloat(number), 1) === 33.3) {
            result = 'at least one-third';
        }
        else {
            result = 'at least ' + number + '%';
        }
        // if (isTrue(verbose) && num !== 50) result = result + ' (' + num + ')';
        return result;
    }
    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    static decimalToPercentage(number, dec = 2) {
        return ((parseFloat(VTools.makeString(number)) || 0.0) * 100).toFixed(dec);
    }
    static roundToDecimal(value, dec = 2) {
        dec = VTools.isNumeric(dec) ? parseInt(VTools.makeString(dec), 10) : 2;
        if (VTools.isNumeric(value)) {
            let bigValue = VTools.parseBigOrZero(value);
            let num = math.divide(
            //   math.round(math.multiply(bigValue, math.bignumber(math.pow(10, dec)))),
            math.round(math.multiply(bigValue, math.pow(10, dec))), math.pow(10, dec));
            // if (dec >= 0) num = num.toFixed(dec);
            if (dec >= 0) {
                num = math.format(num, { notation: 'fixed', precision: dec });
            }
            ;
            num = parseFloat(num.toString());
            return num;
        }
        else {
            return parseFloat(VTools.makeString(value));
        }
    }
    static numberToWords(value) {
        return vn2w.numberToWords(value);
    }
    static enumDate(obj) {
        if (s.isBlank(obj))
            return null;
        if (typeof (obj) === 'number') {
            // let exp = ParseInt(obj.toExponential().split(/e[\+\-]/)[1], 10);
            // if (exp < 12) {
            // } else {
            return obj;
            // }
        }
        if (typeof (obj) === 'string' || typeof (obj) === 'object') {
            // let dateObj = Date.parse(obj);
            // let offset = new Date().getTimezoneOffset()*60000;
            // return new Date(dateObj).getTime() + offset
            return parseInt(moment.utc(obj).format('x'), 10);
        }
        // return Date.parse(obj)
        return parseInt(moment.utc(obj).format('x'), 10);
    }
    static coerceToDate(date, options) {
        try {
            return moment.utc(VTools.enumDate(date) || 0);
        }
        catch (err) {
            return date;
        }
    }
    static formatDate(value, options = { utc: false }) {
        let momentObj;
        if (value && value.toString().length > 0) {
            if (typeof value === 'number') {
                momentObj = moment.unix(value);
            }
            else if (value.toString().trim().match(/^\d{4}-\d{2}\d{2}$/)) {
                momentObj = moment(value, 'YYYY-MM-DD');
            }
            else if (value.toString().trim().match(/^\d{8}$/)) {
                momentObj = moment(value, 'YYYYMMDD');
            }
            else {
                momentObj = moment(value);
            }
            return options['utc'] ? momentObj.utc().format('LL') : momentObj.format('LL');
        }
        else {
            return value;
        }
    }
    static formatDateSentence(date, options) {
        if (s.isBlank(date))
            return date;
        date = VTools.coerceToDate(date, options);
        try {
            return moment(date).format('Do') + ' day of ' + moment(date).format('MMMM, YYYY');
        }
        catch (err) {
            return date;
        }
    }
    static titleize(value) {
        if (s.isBlank(value))
            return value;
        return s.titleize(value.toString().trim());
    }
    static toRoman(value) {
        value = value || 0;
        let result = '';
        if (value === 0) {
            return result;
        }
        ;
        _.each(VTools.ORDERED_ROMAN_MAP, function (pair) {
            let divisor = pair[0];
            let roman = pair[1];
            let quotient = Math.floor(value / divisor);
            let modulus = value % divisor;
            result = result + roman.repeat(quotient);
            value = modulus;
        });
        return result;
    }
    static toRomanette(value) {
        value = value || 0;
        return VTools.toRoman(value).toLowerCase();
    }
    static toAlpha(value, result) {
        value = parseInt(VTools.makeString(value) || '0', 10);
        result = result || '';
        let divisor = 26;
        while (value > 0) {
            let updatedNumber = Math.floor((value - 1) / divisor);
            let modulus = (value - 1) % divisor;
            result = VTools.ALPHABET[modulus] + result;
            value = updatedNumber;
        }
        return result;
    }
    static toOrdinal(value) {
        let ordStub = ['th', 'st', 'nd', 'rd'], modulus = value % 100;
        return value + (ordStub[(modulus - 20) % 10] || ordStub[modulus] || ordStub[0]);
    }
    static join_array(array) {
        if (array && VTools.isArray(array)) {
            let nonBlanks = _.filter(array, (i) => { return !s.isBlank(i); });
            return VTools.smart_array_values(nonBlanks).join(', ');
        }
    }
    static join_array2d(array2d) {
        if (array2d && VTools.isArray(array2d)) {
            return VTools.smart_array2d_values(array2d)
                .map((innerArray) => {
                return VTools.isArray(innerArray) ?
                    innerArray.join(' - ') :
                    innerArray.toString();
            }).join('; ');
        }
    }
    // confusing: doesn't return keys
    static join_array_of_hashes_values(arrayOfHashes) {
        if (arrayOfHashes && VTools.isArray(arrayOfHashes)) {
            return VTools.smart_array_of_hash_values(arrayOfHashes)
                .map((hash) => {
                return (VTools.isObject(hash) ?
                    (_.map(hash, (v, k) => { return VTools.smartFormatValue(v); }).join(', ')) :
                    VTools.smartFormatValue(hash));
            }).join('; ');
        }
    }
    // confusing naming: returns an array
    static hash_to_lines(hash) {
        return _.map(VTools.smart_hash_values(hash), (v, k) => {
            return VTools.makeString(k) + ': ' + VTools.makeString(v);
        });
    }
    // confusing naming: returns a string
    static hashes_to_lines(hashes) {
        if (!VTools.isArray(hashes)) {
            return hashes;
        }
        return hashes.map((hash) => {
            return VTools.hash_to_lines(hash);
        }).join('; ');
    }
    static smartRecursiveFormat(obj) {
        let updatedObj;
        if (obj && VTools.isObject(obj)) {
            updatedObj = _.defaults({}, obj);
            _.each(obj, (v, k) => {
                updatedObj[k] = VTools.smartRecursiveFormat(v);
            });
        }
        else if (obj && VTools.isArray(obj)) {
            updatedObj = [];
            obj.forEach((v) => {
                updatedObj.push(VTools.smartRecursiveFormat(v));
            });
        }
        else {
            updatedObj = VTools.smartFormatValue(obj);
        }
        return updatedObj;
    }
    static smartFormatValue(v) {
        let formattedV = v;
        if (VTools.isDate(v) || moment.isMoment(v) ||
            (typeof v === 'string' && (/^\d\d\d\d\-\d\d\-\d\d$/).test(v))) {
            formattedV = VTools.formatDate(v);
        }
        else if (typeof v === 'number') {
            formattedV = VTools.variableInteger(v);
        }
        return formattedV;
    }
    static valueOrHolder(value) {
        if (s.isBlank(value) || value.toString().replace(/\s/ig, '').length === 0) {
            return '_________________';
        }
        else {
            return value;
        }
    }
    static arrayToHumanList(value, options) {
        options = options || {};
        if (!VTools.isArray(value)) {
            return value;
        }
        ;
        _.defaults(options, {
            separator: ',',
            junctive: 'and',
            serial: null,
        });
        let multipleJunctive = (options['serial'] || (options['separator'] === ';') && !VTools.isFalse(options['serial'])) ?
            (options['separator'] + ' ') : ' ';
        let length = value.length;
        let str = '';
        _.each(value, function (item, index) {
            if (index !== 0) {
                str = str + ((length === 2) ?
                    (' ' + options['junctive'] + ' ') :
                    ((length > 2 && index < (length - 1)) ?
                        (options['separator'] + ' ') :
                        (multipleJunctive + options['junctive'] + ' ')));
            }
            str = str + item;
        });
        return str;
    }
    static jsFormat(val, fns) {
        if (VTools.isBlank(fns)) {
            return VTools.coerceToString(val);
        }
        fns = [].concat(fns || []);
        _.each(fns, (fn) => {
            try {
                val = VTools.hasOwnProperty(fn) ? VTools[fn](val) : val;
            }
            catch (err) {
                return VTools.coerceToString(val);
            }
        });
        return VTools.coerceToString(val);
    }
    static jsFormatVField(val, vFieldHelp, formatterKeys) {
        if (!vFieldHelp || VTools.isBlank(formatterKeys)) {
            return val;
        }
        let fns = [];
        (formatterKeys || []).forEach((formatterKey) => {
            return fns = fns.concat((vFieldHelp || {})[formatterKey] || []);
        });
        return s.isBlank(fns) ? val : VTools.jsFormat(val, fns);
    }
    static jsFormatVFields(item, vFieldsHelp, formatterKeys) {
        if (s.isBlank(item) || !vFieldsHelp)
            return item;
        let updatedItem = {};
        _.each(item, function (val, key) {
            let vFieldHelp = (vFieldsHelp || {})[key] || {};
            updatedItem[key] = VTools.jsFormatVField(val, vFieldHelp, formatterKeys);
        });
        return updatedItem;
    }
    static jsInputProcess(item, vFieldsHelp, formatterKeys) {
        return VTools.jsFormatVFields(item, vFieldsHelp, ['jsInputProcessors']);
    }
    static jsDisplay(item, vFieldsHelp) {
        return VTools.jsFormatVFields(item, vFieldsHelp, ['js_formatters']);
    }
    static jsInputDisplay(item, vFieldsHelp) {
        return VTools.jsFormatVFields(item, vFieldsHelp, ['jsInputProcessors', 'js_formatters']);
    }
}
VTools.string_to_decimal = VTools.stringToDecimal;
VTools.string_to_integer = VTools.stringToInteger;
VTools.smart_array_values = VTools.smartRecursiveFormat;
VTools.smart_hash_values = VTools.smartRecursiveFormat;
VTools.smart_array2d_values = VTools.smartRecursiveFormat;
VTools.smart_array_of_hash_values = VTools.smartRecursiveFormat;
VTools.smart_format_value = VTools.smartFormatValue;
exports.VTools = VTools;
exports.default = VTools;
