'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var VTools = index.VTools

describe('VTools functions test', () => {
  it('should return the ALPHABET', () => {
    var result = VTools.ALPHABET[0];
    expect(result).to.equal('a');
  });
  it('should return the ROMAN_MAP', () => {
    var result = VTools.ROMAN_MAP[1000];
    expect(result).to.equal('M');
  });
  it('should return the ORDERED_ROMAN_MAP', () => {
    var result = VTools.ORDERED_ROMAN_MAP[0];
    expect(result.join('')).to.equal([1000, 'M'].join(''));
  });
  it('should return the PERIOD_FREQUENCY_LEGEND', () => {
    var result = VTools.PERIOD_FREQUENCY_LEGEND[366];
    expect(result).to.equal('One day');
  });
  // it('should return the PERIOD_FREQUENCY_TO_PERIOD', () => {
  //   var result = VTools.PERIOD_FREQUENCY_TO_PERIOD[1];
  //   expect(result).to.equal('TBD');
  // });
  it('should return the ANNUAL_FREQUENCY_TO_LABEL', () => {
    var result = VTools.ANNUAL_FREQUENCY_TO_LABEL[1];
    expect(result).to.equal('Annual');
  });
  // it('should return the ANNUAL_FREQUENCY_TO_TIME', () => {
  //   var result = VTools.ANNUAL_FREQUENCY_TO_TIME[1];
  //   expect(result).to.equal('TBD');
  // });
  it('should return the PERIOD_FREQ_OPTIONS', () => {
    var result = VTools.PERIOD_FREQ_OPTIONS['Annual'];
    expect(result).to.equal(1);
  });
  it('should return the ALL_FISCAL_PERIODS', () => {
    var result = VTools.ALL_FISCAL_PERIODS[1];
    expect(result).to.equal('FY');
  });
  it('should return the PERIODLY', () => {
    var result = VTools.PERIODLY[0];
    expect(result).to.equal('annually');
  });
  it('should return the PERIODS', () => {
    var result = VTools.PERIODS[0];
    expect(result).to.equal('years');
  });
  it('should return SINGULAR_PERIODS', () => {
    var result = VTools.SINGULAR_PERIODS[0];
    expect(result).to.equal('year');
  });


  it('should return isBlank for various', () => {
    var result = [
      VTools.isBlank(null),
      VTools.isBlank(),
      VTools.isBlank(undefined),
      VTools.isBlank(0),
      VTools.isBlank('0'),
      VTools.isBlank(1),
      VTools.isBlank(''),
      VTools.isBlank({}),
      VTools.isBlank({0:null}),
      VTools.isBlank([]),
      VTools.isBlank([0]),
      VTools.isBlank(['']),
      VTools.isBlank(true),
      VTools.isBlank(false),
    ];
    var expectation = [
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isObject for various', () => {
    var result = [
      VTools.isObject(null),
      VTools.isObject(),
      VTools.isObject(undefined),
      VTools.isObject(0),
      VTools.isObject('0'),
      VTools.isObject({}),
      VTools.isObject({0:null}),
      VTools.isObject([]),
      VTools.isObject([0]),
      VTools.isObject(true),
      VTools.isObject(false),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return isArray for various', () => {
    var result = [
      VTools.isArray(null),
      VTools.isArray(),
      VTools.isArray(undefined),
      VTools.isArray(0),
      VTools.isArray('0'),
      VTools.isArray({}),
      VTools.isArray({0:null}),
      VTools.isArray([]),
      VTools.isArray([0]),
      VTools.isArray(true),
      VTools.isArray(false),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isDate for various', () => {
    var result = [
      VTools.isDate(null),
      VTools.isDate(),
      VTools.isDate(undefined),
      VTools.isDate(0),
      VTools.isDate('0'),
      VTools.isDate({}),
      VTools.isDate({0:null}),
      VTools.isDate([]),
      VTools.isDate([0]),
      VTools.isDate(true),
      VTools.isDate(false),
      VTools.isDate(Date.now()), // returns a number
      VTools.isDate(new Date()),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isString for various', () => {
    var result = [
      VTools.isString(null),
      VTools.isString(),
      VTools.isString(undefined),
      VTools.isString(0),
      VTools.isString('0'),
      VTools.isString({}),
      VTools.isString({0:null}),
      VTools.isString([]),
      VTools.isString([0]),
      VTools.isString(true),
      VTools.isString(false),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isTrue for various', () => {
    var result = [
      VTools.isTrue(null),
      VTools.isTrue(),
      VTools.isTrue(undefined),
      VTools.isTrue(0),
      VTools.isTrue('0'),
      VTools.isTrue({}),
      VTools.isTrue({0:null}),
      VTools.isTrue([]),
      VTools.isTrue([0]),
      VTools.isTrue(true),
      VTools.isTrue(false),
      VTools.isTrue('yEs'),
      VTools.isTrue('Y'),
      VTools.isTrue('TRUE'),
      VTools.isTrue('T'),
      VTools.isTrue(1),
      VTools.isTrue('On'),
    ];
    var expectation = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isFalse for various', () => {
    var result = [
      VTools.isFalse(null),
      VTools.isFalse(),
      VTools.isFalse(undefined),
      VTools.isFalse(0),
      VTools.isFalse('0'),
      VTools.isFalse({}),
      VTools.isFalse({0:null}),
      VTools.isFalse([]),
      VTools.isFalse([0]), // gets stringified
      VTools.isFalse(true),
      VTools.isFalse(false),
      VTools.isFalse('nO'),
      VTools.isFalse('N'),
      VTools.isFalse('FALSE'),
      VTools.isFalse('F'),
      VTools.isFalse(0),
      VTools.isFalse('OFF'),
    ];
    var expectation = [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return isTrueOrFalse for various', () => {
    var result = [
      VTools.isTrueOrFalse(null),
      VTools.isTrueOrFalse(),
      VTools.isTrueOrFalse(undefined),
      VTools.isTrueOrFalse(0),
      VTools.isTrueOrFalse('0'),
      VTools.isTrueOrFalse({}),
      VTools.isTrueOrFalse({0:null}),
      VTools.isTrueOrFalse([]),
      VTools.isTrueOrFalse([0]), // gets stringified
      VTools.isTrueOrFalse(true),
      VTools.isTrueOrFalse(false),
      VTools.isTrueOrFalse('yEs'),
      VTools.isTrueOrFalse('Y'),
      VTools.isTrueOrFalse('TRUE'),
      VTools.isTrueOrFalse('T'),
      VTools.isTrueOrFalse(1),
      VTools.isTrueOrFalse('On'),
      VTools.isTrueOrFalse('nO'),
      VTools.isTrueOrFalse('N'),
      VTools.isTrueOrFalse('FALSE'),
      VTools.isTrueOrFalse('F'),
      VTools.isTrueOrFalse(0),
      VTools.isTrueOrFalse('OFF'),
    ];
    var expectation = [
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return eachSlice for various', () => {
    var result = '';
    VTools.eachSlice([1, 2, 3, 4, 5, 6], 3, function(numberPiece) {
      result += numberPiece.join('');
    });
    var expectation = [1, 2, 3, 4, 5, 6];
    expect(result).to.equal(expectation.join(''));
  });

  it('should return makeString for various', () => {
    var result = [
      VTools.makeString(null),
      VTools.makeString(),
      VTools.makeString(undefined),
      VTools.makeString(0),
      VTools.makeString('0'),
      VTools.makeString(1),
      VTools.makeString(''),
      VTools.makeString({}),
      VTools.makeString({0:null}),
      VTools.makeString([]),
      VTools.makeString([0]),
      VTools.makeString(['']),
      VTools.makeString(true),
      VTools.makeString(false),
    ];
    var expectation = [
      '',
      '',
      '',
      '0',
      '0',
      '1',
      '',
      '[object Object]',
      '[object Object]',
      '',
      '0',
      '',
      'true',
      'false',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return coerceToString for various', () => {
    var result = [
      VTools.coerceToString(null),
      VTools.coerceToString(),
      VTools.coerceToString(undefined),
      VTools.coerceToString(0),
      VTools.coerceToString('0'),
      VTools.coerceToString(1),
      VTools.coerceToString(''),
      VTools.coerceToString({}),
      VTools.coerceToString({0:null}),
      VTools.coerceToString([]),
      VTools.coerceToString([0]),
      VTools.coerceToString(['']),
      VTools.coerceToString(true),
      VTools.coerceToString(false),
    ];
    var expectation = [
      '',
      '',
      '',
      '0',
      '0',
      '1',
      '',
      '[object Object]',
      '[object Object]',
      '',
      '0',
      '',
      'true',
      'false',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });  
  it('should return pluralize', () => {
    var result = [
      VTools.pluralize('mark'),
      VTools.pluralize('die'),
      VTools.pluralize('person'),
      VTools.pluralize('addendum'),
    ];
    var expectation = [
      'marks',
      'dice',
      'people',
      'addenda',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return reverse', () => {
    var result = VTools.reverse('1234');
    expect(result).to.equal('4321');
  });
  it('should return pluralize', () => {
    var result = [
      VTools.ambipluralize('mark'),
      VTools.ambipluralize('country'),
      VTools.ambipluralize('share'),
    ];
    var expectation = [
      'mark(s)',
      'countr(ies)',
      'share(s)',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return normalizeString', () => {
    var result = VTools.normalizeString('1m!@#$%^&*()~=+,./?><o0');
    expect(result).to.equal('pre_1mo0');
  });
  it('should return parseZeroPaddedInt for number', () => {
    var result = [
      VTools.parseZeroPaddedInt('0'),
      VTools.parseZeroPaddedInt('010'),
      VTools.parseZeroPaddedInt(100),
      VTools.parseZeroPaddedInt(100.001),
      VTools.parseZeroPaddedInt('00100.001'),
    ];
    var expectation = [
      0,
      10,
      100,
      100,
      100,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return stringToDecimal', () => {
    var result = [
      VTools.stringToDecimal('0'),
      VTools.stringToDecimal('010'),
      VTools.stringToDecimal(100),
      VTools.stringToDecimal(100.001),
      VTools.stringToDecimal('00100.001'),
      VTools.string_to_decimal('00100.001'),
    ];
    var expectation = [
      0.0,
      10.0,
      100.0,
      100.001,
      100.001,
      100.001,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return stringToInteger', () => {
    var result = [
      VTools.stringToInteger('0'),
      VTools.stringToInteger('010'),
      VTools.stringToInteger(100),
      VTools.stringToInteger(100.001),
      VTools.stringToInteger('00100.001'),
      VTools.string_to_integer('00100.001'),
    ];
    var expectation = [
      0,
      10,
      100,
      100,
      100,
      100,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return parseBigOrZero', () => {
    var result = [
      VTools.parseBigOrZero(null),
      VTools.parseBigOrZero('0'),
      VTools.parseBigOrZero('010'),
      VTools.parseBigOrZero(100),
      VTools.parseBigOrZero(100.001),
      VTools.parseBigOrZero('00100.001'),
      VTools.parseBigOrZero('00100.001'),
    ];
    var expectation = [
      0.0,
      0.0,
      10.0,
      100.0,
      100.001,
      100.001,
      100.001,
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return variableCurrency', () => {
    var result = [
      VTools.variableCurrency(null),
      VTools.variableCurrency('0'),
      VTools.variableCurrency('010'),
      VTools.variableCurrency(100),
      VTools.variableCurrency(100.001),
      VTools.variableCurrency('00100.001'),
      VTools.variableCurrency('00100.001'),
      VTools.variableCurrency('$00100.001'), // to check this case
      VTools.variableCurrency(100.0000009),
      VTools.variableCurrency(100.0000009, '£'),
    ];
    var expectation = [
      '$0.00',
      '$0.00',
      '$10.00',
      '$100.00',
      '$100.001',
      '$100.001',
      '$100.001',
      '$100.00',
      '$100.0000009',
      '£100.0000009',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return variableInteger', () => {
    var result = [
      VTools.variableInteger(null), // to check this case
      VTools.variableInteger('0'),
      VTools.variableInteger('010'),
      VTools.variableInteger(100),
      VTools.variableInteger(100.001),
      VTools.variableInteger('00100.001'),
      VTools.variableInteger('00100.001'),
      VTools.variableInteger(100.0000009),
      VTools.variableInteger(100.0000009),
    ];
    var expectation = [
      '',
      '0',
      '10',
      '100',
      '100.001',
      '100.001',
      '100.001',
      '100.0000009',
      '100.0000009',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return noExponentsStr', () => {
    var result = [
      VTools.noExponentsStr(null), // to check this case
      VTools.noExponentsStr('0'),
      VTools.noExponentsStr('010'),
      VTools.noExponentsStr(100),
      VTools.noExponentsStr(1e2),
      VTools.noExponentsStr(100.001),
      VTools.noExponentsStr('00100.001'),
      VTools.noExponentsStr('00100.001'),
      VTools.noExponentsStr(100.0000009),
      VTools.noExponentsStr(100.0000009),
      VTools.noExponentsStr(1.000000009e2),
      VTools.noExponentsStr('1.000000009e2'),
      VTools.noExponentsStr(10000.00009e-2),
    ];
    var expectation = [
      'NaN',
      '0',
      '10',
      '100',
      '100',
      '100.001',
      '100.001',
      '100.001',
      '100.0000009',
      '100.0000009',
      '100.0000009',
      '100.0000009',
      '100.0000009',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return decimalToStr', () => {
    var result = [
      VTools.decimalToStr(null),
      VTools.decimalToStr('0'),
      VTools.decimalToStr('010'),
      VTools.decimalToStr(100),
      VTools.decimalToStr(1e2),
      VTools.decimalToStr(100.001),
      VTools.decimalToStr('00100.001'),
      VTools.decimalToStr('00100.001'),
      VTools.decimalToStr(100.0000009),
      VTools.decimalToStr(100.0000009),
      VTools.decimalToStr(1.000000009e2),
      VTools.decimalToStr('1.000000009e2'),
      VTools.decimalToStr(10000.00009e-2),
    ];
    var expectation = [
      '',
      '0.00',
      '10.00',
      '100.00',
      '100.00',
      '100.001',
      '100.001',
      '100.001',
      '100.0000009',
      '100.0000009',
      '100.0000009',
      '100.0000009',
      '100.0000009',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });

  it('should return decimalToPercStr', () => {
    var result = [
      VTools.decimalToPercStr(null),
      VTools.decimalToPercStr('0'),
      VTools.decimalToPercStr('010'),
      VTools.decimalToPercStr(100),
      VTools.decimalToPercStr(1e2),
      VTools.decimalToPercStr(100.001),
      VTools.decimalToPercStr('00100.001'),
      VTools.decimalToPercStr('00100.001'),
      VTools.decimalToPercStr(100.0000009),
      VTools.decimalToPercStr(100.0000009),
      VTools.decimalToPercStr(1.000000009e2),
      VTools.decimalToPercStr('1.000000009e2'),
      VTools.decimalToPercStr(10000.00009e-2),
    ];
    var expectation = [
      '0.00%',
      '0.00%',
      '1000.00%',
      '10000.00%',
      '10000.00%',
      '10000.10%',
      '10000.10%',
      '10000.10%',
      '10000.00009%',
      '10000.00009%',
      '10000.00009%',
      '10000.00009%',
      '10000.00009%',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return percToDecimal', () => {
    var result = [
      VTools.percToDecimal(null),
      VTools.percToDecimal('0'),
      VTools.percToDecimal('010'),
      VTools.percToDecimal(100),
      VTools.percToDecimal(1e2),
      VTools.percToDecimal(100.001),
      VTools.percToDecimal('00100.001'),
      VTools.percToDecimal('00100.001'),
      VTools.percToDecimal(100.0000009),
      VTools.percToDecimal(100.0000009),
      VTools.percToDecimal(1.000000009e2),
      VTools.percToDecimal('1.000000009e2'),
      VTools.percToDecimal(10000.00009e-2),
    ];
    var expectation = [
      '0',
      '0',
      '0.1',
      '1',
      '1',
      '1.00001',
      '1.00001',
      '1.00001',
      '1.000000009',
      '1.000000009',
      '1.000000009',
      '1.000000009',
      '1.000000009',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return percentThreshold', () => {
    var result = [
      VTools.percentThreshold(null),
      VTools.percentThreshold('0'),
      VTools.percentThreshold('010'),
      VTools.percentThreshold(100),
      VTools.percentThreshold(1e2),
      VTools.percentThreshold(100.001),
      VTools.percentThreshold('00100.001'),
      VTools.percentThreshold('00100.001'),
      VTools.percentThreshold(100.0000009),
      VTools.percentThreshold(100.0000009),
      VTools.percentThreshold(1.000000009e2),
      VTools.percentThreshold('1.000000009e2'),
      VTools.percentThreshold(10000.00009e-2),
      VTools.percentThreshold(66.6666666666),
      VTools.percentThreshold(66.66),
      VTools.percentThreshold(33.33),
      VTools.percentThreshold(50),
    ];
    var expectation = [
      '',
      'at least 0%',
      'at least 010%', // check
      'at least 100%',
      'at least 100%',
      'at least 100.001%',
      'at least 00100.001%', // check
      'at least 00100.001%', // check
      'at least 100.0000009%',
      'at least 100.0000009%',
      'at least 100.0000009%',
      'at least 1.000000009e2%', // check
      'at least 100.0000009%',
      'at least two-thirds',
      'at least two-thirds',
      'at least one-third',
      'a majority',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return numberWithCommas', () => {
    var result = [
      // VTools.numberWithCommas(null),
      VTools.numberWithCommas('0'),
      VTools.numberWithCommas('010'),
      VTools.numberWithCommas(100),
      VTools.numberWithCommas(1e2),
      VTools.numberWithCommas(100.001),
      VTools.numberWithCommas('1100100.001'),
      VTools.numberWithCommas('00100.001'),
      VTools.numberWithCommas(100.0000009),
      VTools.numberWithCommas(100.0000009),
      VTools.numberWithCommas(1.000000009e2),
      VTools.numberWithCommas('1.000000009e2'),
      VTools.numberWithCommas(10000.00009e-2),
    ];
    var expectation = [
      // '',
      '0',
      '010', // check
      '100',
      '100',
      '100.001',
      '1,100,100.001',
      '00,100.001', // check
      '100.0,000,009', // check
      '100.0,000,009', // check
      '100.0,000,009', // check
      '1.000,000,009e2', // check
      '100.0,000,009', // check
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return decimalToPercentage', () => {
    var result = [
      VTools.decimalToPercentage(null),
      VTools.decimalToPercentage('0'),
      VTools.decimalToPercentage('010'),
      VTools.decimalToPercentage(100),
      VTools.decimalToPercentage(1e2, 4),
      VTools.decimalToPercentage(100.001),
      VTools.decimalToPercentage('00100.001'),
      VTools.decimalToPercentage('00100.001', 2),
      VTools.decimalToPercentage(100.0000009, 5),
      VTools.decimalToPercentage(100.0000009),
      VTools.decimalToPercentage(1.000000009e2),
      VTools.decimalToPercentage('1.000000009e2', 5),
      VTools.decimalToPercentage(10000.00009e-2),
    ];
    var expectation = [
      '0.00',
      '0.00',
      '1000.00',
      '10000.00',
      '10000.0000',
      '10000.10',
      '10000.10',
      '10000.10',
      '10000.00009',
      '10000.00',
      '10000.00',
      '10000.00009',
      '10000.00',
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return roundToDecimal', () => {
    var result = [
      VTools.roundToDecimal(null),
      VTools.roundToDecimal('0'),
      VTools.roundToDecimal('010'),
      VTools.roundToDecimal(100),
      VTools.roundToDecimal(1e2, 2),
      VTools.roundToDecimal(100.001),
      VTools.roundToDecimal('00100.001'),
      VTools.roundToDecimal('00100.001', 3),
      VTools.roundToDecimal(100.0000009, 7),
      VTools.roundToDecimal(100.0000009, 6),
      VTools.roundToDecimal(1.000000009e2),
      VTools.roundToDecimal('1.000000009e2', 7),
      VTools.roundToDecimal(10000.00009e-2),
    ];
    var expectation = [
      'NaN',
      '0', // check
      '10', // check
      '100', // check
      '100', // check
      '100', // check
      '100', // check
      '100.001',
      '100.0000009',
      '100.000001',
      '100', // check
      '100.0000009',
      '100', // check
    ];
    expect(result.join('')).to.equal(expectation.join(''));
  });
  it('should return numberToWords for number', () => {
    // tested in v-number-to-words
    var result = VTools.numberToWords(2);
    expect(result).to.equal('two');
  });
  it('for enumDate should get unix UTC timestamp given a unix UTC timestamp', () => {
    var result = VTools.enumDate(1439344269);
    expect(result).to.equal(1439344269);
  });
  it('for enumDate should get unix UTC timestamp given a date', () => {
    var result = VTools.enumDate('August 11, 2015');
    // 1439265600000
    expect(result).to.equal(1439251200000);
  });
  it('for enumDate should get unix UTC timestamp given a date', () => {
    var result = VTools.enumDate('August 11, 2015 21:51:09');
    expect(result).to.equal(1439329869000);
  });

  it('should return toRomanette for number', () => {
    var result = VTools.toRomanette(2);
    expect(result).to.equal('ii');
  });
});