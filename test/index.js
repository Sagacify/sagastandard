/* global describe, it */
const eslint = require('eslint');
const path = require('path');
const chai = require('chai');

chai.should();

const linter = new eslint.CLIEngine({
  configFile: path.join(__dirname, '..', 'eslintrc.json')
});

describe('sagastandard', () => {
  it('requires block statements to be on mumtiple lines', () => {
    var result = linter.executeOnText('var foo = 0;\nif (foo) { foo++; }\n');
    result.errorCount.should.equal(2);
    result.results[0].messages[0].message
      .should.equal('Statement inside of curly braces should be on next line.');
  });

  it('refuses single line if statements without curly braces', () => {
    var result = linter.executeOnText('var foo = 0;\nif (foo) foo++;\n');
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Expected { after \'if\' condition.');
  });

  it('refuses single line if statements with curly braces', () => {
    var result = linter.executeOnText(
      'var foo = 0;\nif (foo) {\n  foo++;\n}\n');
    result.errorCount.should.equal(0);
  });

  it('accepts lines of maximum 80 characters', () => {
    var result = linter.executeOnText(
      "'hi there this is a reallly long line . I wonder how long it can get before it';\n"); // eslint-disable-line max-len
    result.errorCount.should.equal(0);
  });

  it('refuses lines with a length of 81 characters', () => {
    var result = linter.executeOnText(
      "'hi there this is a reallly long line . I wonder how long it can get before it ';\n");  // eslint-disable-line max-len
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Line 1 exceeds the maximum line length of 80.');
  });

  it('refuses lines with a length of more than 80 characters', () => {
    var result = linter.executeOnText(
      "'hi there this is a reallly long line . I wonder how long it can get before it fails';\n");  // eslint-disable-line max-len
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Line 1 exceeds the maximum line length of 80.');
  });

  it('accepts lines exceeding 80 characters containing an url', () => {
    var result = linter.executeOnText("var url = 'https://this.is.a/very/long/url/that/messesWithOurMaxLineLengthRule#shame';\nexport default url;\n");
    result.errorCount.should.equal(0);
  });

  it('refuses console.log statements', () => {
    var result = linter.executeOnText("console.log('hi there');\n");
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Unexpected console statement.');
  });

  it('refuses debugger statements', () => {
    var result = linter.executeOnText('debugger;\n');
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal("Unexpected 'debugger' statement.");
  });

  it('refuses unecessary semicolons', () => {
    var result = linter.executeOnText(";var t = 'test';\nexport default t;\n");
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Unnecessary semicolon.');
  });

  it('refuses a space before a semicolon', () => {
    var result = linter.executeOnText("var t = 'test' ;\nexport default t;\n");
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Unexpected whitespace before semicolon.');
  });

  it('requires a space after a semicolon', () => {
    var result = linter.executeOnText("var t = 'test';export default t;\n");
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Missing whitespace after semicolon.');
  });

  it('requires semicolons', () => {
    var result = linter.executeOnText(
      'const test = 1 + 1\nexport default test;\n');
    result.errorCount.should.equal(1);
    result.results[0].messages[0].message
      .should.equal('Missing semicolon.');
  });
});
