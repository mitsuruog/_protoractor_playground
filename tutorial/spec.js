describe('Protoractorのサンプルテスト', () => {

  beforeEach(() => {
    browser.get('http://juliemr.github.io/protractor-demo/');
  });

  it('タイトルが存在すること', () => {
    expect(browser.getTitle()).toEqual('Super Calculator');
  })

  describe('要素の操作の確認', () => {

    describe('1+2の確認', () => {
      beforeEach(() => {
        element(by.model('first')).sendKeys(1);
        element(by.model('second')).sendKeys(2);
        element(by.id('gobutton')).click();
      });
      it('3であること', () => {
        expect(element(by.binding('latest')).getText()).toEqual('3');
      });
    });

    describe('4+6の確認', function() {
      beforeEach(() => {
        element(by.model('first')).sendKeys(4);
        element(by.model('second')).sendKeys(6);
        element(by.id('gobutton')).click();
      });
      it('10であること', () => {
        expect(element(by.binding('latest')).getText()).toEqual('10');
      });
    });
  });

  describe('履歴の確認', () => {
    beforeEach(() => {
      element(by.model('first')).sendKeys(1);
      element(by.model('second')).sendKeys(2);
      element(by.id('gobutton')).click();
      element(by.model('first')).sendKeys(4);
      element(by.model('second')).sendKeys(6);
      element(by.id('gobutton')).click();
    });
    it('履歴は2件あること', () => {
      expect(element.all(by.repeater('result in memory')).count()).toEqual(2);
    });
    describe('履歴は作成日時の降順であることの確認', () => {
      it('1行目は4+6であること', () => {
        expect(element.all(by.repeater('result in memory')).first().getText()).toContain('4 + 6');
      });
      it('2行目は1+2であること', () => {
        expect(element.all(by.repeater('result in memory')).last().getText()).toContain('1 + 2');
      });
    });
  });

});
