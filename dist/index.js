"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var s = require("underscore.string");
var pluralize = require("pluralize");
var moment = require("moment");
var math = require("mathjs");
var accounting = require("accounting");
var vn2w = require("v-number-to-words");
var v_utilities_1 = require("v-utilities");
var VTools = /** @class */ (function () {
    function VTools() {
    }
    Object.defineProperty(VTools, "ROUND_TO_DEFAULT", {
        get: function () {
            return 7;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "ALPHABET", {
        get: function () {
            return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "ROMAN_MAP", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "ORDERED_ROMAN_MAP", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "PERIOD_FREQUENCY_LEGEND", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "ANNUAL_FREQUENCY_TO_LABEL", {
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
        get: function () {
            return {
                '1': 'Annual',
                '4': 'Quarterly',
                '12': 'Monthly',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "PERIOD_FREQ_OPTIONS", {
        // public static get ANNUAL_FREQUENCY_TO_TIME(): {} { return {
        // '1': '1.year',
        // '4': '3.months',
        // '12': '1.month',
        //   };
        // }
        get: function () {
            return {
                'Annual': 1,
                'Semi-Annual': 2,
                'Quarter': 4,
                'Month': 8,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "ALL_FISCAL_PERIODS", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "PERIODLY", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "PERIODS", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VTools, "SINGULAR_PERIODS", {
        get: function () {
            return _.map(VTools.PERIODS, function (i) { return pluralize(i, 1); });
        },
        enumerable: true,
        configurable: true
    });
    VTools.pluralize = function (value) {
        return pluralize.apply(this, arguments);
    };
    VTools.ambipluralize = function (value) {
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
    };
    VTools.normalizeString = function (value) {
        return (value || '').toString()
            .replace(/[\s\'\.\,\:\;\/\(\)\[\]\-\#\@\!\$\%\^\&\*\+\=\"\?\<\>\~\`]+/g, '')
            .replace(/^\d/, function (m) { return 'pre_' + m[0]; });
    };
    VTools.parseZeroPaddedInt = function (value) {
        if (s.isBlank(value) || value === 0 || value === '0' || s.isBlank(value.toString().replace(/0/g, ''))) {
            return 0;
        }
        value = value.toString();
        var firstNonZeroIndex = value.search(/(?!0)/);
        return parseInt(value.slice(firstNonZeroIndex, value.length), 10);
    };
    VTools.stringToDecimal = function (s) {
        // return parseFloat((s || 0).toSting().trim().replace(/[\,\$\%\-{2,}]*/g, ''))
        // return parseFloat((s || 0).toSting().trim()
        //   .replace(/[\,\$\%]*/g, '').replace(/\p{Sc}/ug, ''))
        return parseFloat((s || 0).toString().trim().replace(/[^\d\.]/g, ''));
    };
    VTools.stringToInteger = function (s) {
        return parseInt(VTools.stringToDecimal(s).toString(), 10);
    };
    VTools.variableCurrency = function (number, currency) {
        number = v_utilities_1.VUtilities.makeString(number);
        if (VTools.roundToDecimal(parseFloat(number), 2) === parseFloat(number)) {
            return accounting.formatMoney(number, currency);
        }
        else {
            var str = VTools.decimalToStr(parseFloat(number));
            var precision = str ? (str.split('.')[1] || '').length : 2;
            if (precision === 1)
                precision = 2;
            return accounting.formatMoney(number, currency, precision);
        }
    };
    VTools.variableInteger = function (number) {
        number = v_utilities_1.VUtilities.makeString(number);
        if (!VTools.isNumeric(number))
            return number;
        if (VTools.roundToDecimal(parseFloat(number), 0) === parseFloat(number)) {
            return accounting.formatNumber(number);
        }
        else {
            var decimalStr = VTools.decimalToStr(parseFloat(number));
            if (!decimalStr)
                return decimalStr;
            var pieces = decimalStr.split('.');
            return accounting.formatNumber((pieces[0] || '0')) + '.' + (pieces[1] || '00');
        }
    };
    VTools.noExponentsStr = function (number) {
        number = v_utilities_1.VUtilities.makeString(number);
        var f = parseFloat(number);
        var data = String(f).split(/[eE]/);
        if (data.length === 1) {
            return data[0];
        }
        var z = '', sign = f < 0 ? '-' : '', str = data[0].replace('.', ''), mag = Number(data[1]) + 1;
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
    };
    VTools.decimalToStr = function (number, roundTo) {
        if (roundTo === void 0) { roundTo = VTools.ROUND_TO_DEFAULT; }
        number = v_utilities_1.VUtilities.makeString(number);
        var f = parseFloat(number);
        var str = VTools.noExponentsStr(f);
        roundTo = VTools.isNumeric(roundTo) ? parseInt(roundTo.toString(), 10) : VTools.ROUND_TO_DEFAULT;
        if (str === 'NaN')
            return null;
        var firstNonZeroIndex = (VTools.reverse(str).split('')).findIndex(function (element) {
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
    };
    VTools.decimalToPercStr = function (number) {
        return (VTools.decimalToStr(parseFloat(math.multiply(v_utilities_1.VUtilities.parseBigOrZero(number), math.bignumber(100.0)).toString())) || '0.0') + '%';
    };
    VTools.percToDecimal = function (number) {
        return parseFloat(math.divide(v_utilities_1.VUtilities.parseBigOrZero(number), math.bignumber(100.0)).toString());
    };
    VTools.percentThreshold = function (number, verbose) {
        if (!VTools.isNumeric(number))
            return number;
        number = v_utilities_1.VUtilities.makeString(number);
        var result;
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
    };
    VTools.numberWithCommas = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    VTools.decimalToPercentage = function (number, dec) {
        if (dec === void 0) { dec = 2; }
        return ((parseFloat(v_utilities_1.VUtilities.makeString(number)) || 0.0) * 100).toFixed(dec);
    };
    VTools.roundToDecimal = function (value, dec) {
        if (dec === void 0) { dec = 2; }
        dec = VTools.isNumeric(dec) ? parseInt(v_utilities_1.VUtilities.makeString(dec), 10) : 2;
        if (VTools.isNumeric(value)) {
            var bigValue = v_utilities_1.VUtilities.parseBigOrZero(value);
            var num = math.divide(
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
            return parseFloat(v_utilities_1.VUtilities.makeString(value));
        }
    };
    VTools.numberToWords = function (value) {
        return vn2w.numberToWords(value);
    };
    VTools.coerceToDate = function (date, options) {
        try {
            return moment.utc(v_utilities_1.VUtilities.enumDate(date) || 0);
        }
        catch (err) {
            return date;
        }
    };
    VTools.formatDate = function (value, options) {
        if (options === void 0) { options = { utc: false }; }
        var momentObj;
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
    };
    VTools.formatDateSentence = function (date, options) {
        if (s.isBlank(date))
            return date;
        date = VTools.coerceToDate(date, options);
        try {
            return moment(date).format('Do') + ' day of ' + moment(date).format('MMMM, YYYY');
        }
        catch (err) {
            return date;
        }
    };
    VTools.labelize = function (str) {
        return s.titleize(VTools.hintize(str));
    };
    VTools.hintize = function (str) {
        return s.capitalize(s.underscored((str || '').toString())
            .split(/\_|(\W)/).join(' ').replace(/\s+/g, ' '));
    };
    VTools.titleize = function (value) {
        if (s.isBlank(value))
            return value;
        return s.titleize(value.toString().trim());
    };
    VTools.toRoman = function (value) {
        value = value || 0;
        var result = '';
        if (value === 0) {
            return result;
        }
        ;
        _.each(VTools.ORDERED_ROMAN_MAP, function (pair) {
            var divisor = pair[0];
            var roman = pair[1];
            var quotient = Math.floor(value / divisor);
            var modulus = value % divisor;
            result = result + roman.repeat(quotient);
            value = modulus;
        });
        return result;
    };
    VTools.toRomanette = function (value) {
        value = value || 0;
        return VTools.toRoman(value).toLowerCase();
    };
    VTools.toAlpha = function (value, result) {
        value = parseInt(v_utilities_1.VUtilities.makeString(value) || '0', 10);
        result = result || '';
        var divisor = 26;
        while (value > 0) {
            var updatedNumber = Math.floor((value - 1) / divisor);
            var modulus = (value - 1) % divisor;
            result = VTools.ALPHABET[modulus] + result;
            value = updatedNumber;
        }
        return result;
    };
    VTools.toOrdinal = function (value) {
        var ordStub = ['th', 'st', 'nd', 'rd'], modulus = value % 100;
        return value + (ordStub[(modulus - 20) % 10] || ordStub[modulus] || ordStub[0]);
    };
    VTools.joinArray = function (array) {
        if (array && VTools.isArray(array)) {
            var nonBlanks = _.filter(array, function (i) { return !s.isBlank(i); });
            return VTools.smart_array_values(nonBlanks).join(', ');
        }
    };
    VTools.joinArray2d = function (array2d) {
        if (array2d && VTools.isArray(array2d)) {
            return VTools.smart_array2d_values(array2d)
                .map(function (innerArray) {
                return VTools.isArray(innerArray) ?
                    innerArray.join(' - ') :
                    innerArray.toString();
            }).join('; ');
        }
    };
    // confusing: doesn't return keys
    VTools.joinArrayOfHashesValues = function (arrayOfHashes) {
        if (arrayOfHashes && VTools.isArray(arrayOfHashes)) {
            return VTools.smart_array_of_hash_values(arrayOfHashes)
                .map(function (hash) {
                return (VTools.isObject(hash) ?
                    (_.map(hash, function (v, k) { return VTools.smartFormatValue(v); }).join(', ')) :
                    VTools.smartFormatValue(hash));
            }).join('; ');
        }
    };
    // confusing naming: returns an array
    VTools.hashToLines = function (hash) {
        return _.map(VTools.smart_hash_values(hash), function (v, k) {
            return v_utilities_1.VUtilities.makeString(k) + ': ' + v_utilities_1.VUtilities.makeString(v);
        });
    };
    // confusing naming: returns a string
    VTools.hashesToLines = function (hashes) {
        if (!VTools.isArray(hashes)) {
            return hashes;
        }
        return hashes.map(function (hash) {
            return VTools.hash_to_lines(hash);
        }).join('; ');
    };
    VTools.smartRecursiveFormat = function (obj) {
        var updatedObj;
        if (obj && VTools.isObject(obj)) {
            updatedObj = _.defaults({}, obj);
            _.each(obj, function (v, k) {
                updatedObj[k] = VTools.smartRecursiveFormat(v);
            });
        }
        else if (obj && VTools.isArray(obj)) {
            updatedObj = [];
            obj.forEach(function (v) {
                updatedObj.push(VTools.smartRecursiveFormat(v));
            });
        }
        else {
            updatedObj = VTools.smartFormatValue(obj);
        }
        return updatedObj;
    };
    VTools.smartFormatValue = function (v) {
        var formattedV = v;
        if (VTools.isDate(v) || moment.isMoment(v) ||
            (typeof v === 'string' && (/^\d\d\d\d\-\d\d\-\d\d$/).test(v))) {
            formattedV = VTools.formatDate(v);
        }
        else if (typeof v === 'number') {
            formattedV = VTools.variableInteger(v);
        }
        return formattedV;
    };
    VTools.valueOrHolder = function (value) {
        if (s.isBlank(value) || value.toString().replace(/\s/ig, '').length === 0) {
            return '_________________';
        }
        else {
            return value;
        }
    };
    VTools.arrayToHumanList = function (value, options) {
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
        var multipleJunctive = (options['serial'] || (options['separator'] === ';') && !VTools.isFalse(options['serial'])) ?
            (options['separator'] + ' ') : ' ';
        var length = value.length;
        var str = '';
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
    };
    VTools.jsFormat = function (val, fns) {
        if (VTools.isBlank(fns)) {
            return VTools.coerceToString(val);
        }
        fns = [].concat(fns || []);
        _.each(fns, function (fn) {
            try {
                val = VTools.hasOwnProperty(fn) ? VTools[fn](val) : val;
            }
            catch (err) {
                return VTools.coerceToString(val);
            }
        });
        return VTools.coerceToString(val);
    };
    VTools.jsFormatVField = function (val, vFieldHelp, formatterKeys) {
        if (!vFieldHelp || VTools.isBlank(formatterKeys)) {
            return val;
        }
        var fns = [];
        (formatterKeys || []).forEach(function (formatterKey) {
            return fns = fns.concat((vFieldHelp || {})[formatterKey] || []);
        });
        return s.isBlank(fns) ? val : VTools.jsFormat(val, fns);
    };
    VTools.jsFormatVFields = function (item, vFieldsHelp, formatterKeys) {
        if (s.isBlank(item) || !vFieldsHelp)
            return item;
        var updatedItem = {};
        _.each(item, function (val, key) {
            var vFieldHelp = (vFieldsHelp || {})[key] || {};
            updatedItem[key] = VTools.jsFormatVField(val, vFieldHelp, formatterKeys);
        });
        return updatedItem;
    };
    VTools.jsInputProcess = function (item, vFieldsHelp, formatterKeys) {
        return VTools.jsFormatVFields(item, vFieldsHelp, ['jsInputProcessors']);
    };
    VTools.jsDisplay = function (item, vFieldsHelp) {
        return VTools.jsFormatVFields(item, vFieldsHelp, ['js_formatters']);
    };
    VTools.jsInputDisplay = function (item, vFieldsHelp) {
        return VTools.jsFormatVFields(item, vFieldsHelp, ['jsInputProcessors', 'js_formatters']);
    };
    VTools.isBlank = v_utilities_1.VUtilities.isBlank;
    VTools.isObject = v_utilities_1.VUtilities.isObject;
    VTools.isArray = v_utilities_1.VUtilities.isArray;
    VTools.isDate = v_utilities_1.VUtilities.isDate;
    VTools.isString = v_utilities_1.VUtilities.isString;
    VTools.isNumeric = v_utilities_1.VUtilities.isNumeric;
    VTools.isTrue = v_utilities_1.VUtilities.isTrue;
    VTools.isFalse = v_utilities_1.VUtilities.isFalse;
    VTools.isTrueOrFalse = v_utilities_1.VUtilities.isTrueOrFalse;
    VTools.coerceToString = v_utilities_1.VUtilities.coerceToString;
    VTools.reverse = v_utilities_1.VUtilities.reverse;
    VTools.string_to_decimal = VTools.stringToDecimal;
    VTools.string_to_integer = VTools.stringToInteger;
    VTools.join_array = VTools.joinArray;
    VTools.join_array2d = VTools.joinArray2d;
    VTools.join_array_of_hashes_values = VTools.joinArrayOfHashesValues;
    VTools.hash_to_lines = VTools.hashToLines;
    VTools.hashes_to_lines = VTools.hashesToLines;
    VTools.smart_array_values = VTools.smartRecursiveFormat;
    VTools.smart_hash_values = VTools.smartRecursiveFormat;
    VTools.smart_array2d_values = VTools.smartRecursiveFormat;
    VTools.smart_array_of_hash_values = VTools.smartRecursiveFormat;
    VTools.smart_format_value = VTools.smartFormatValue;
    return VTools;
}());
exports.VTools = VTools;
exports.default = VTools;
