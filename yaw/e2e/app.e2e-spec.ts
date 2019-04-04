import { YawPage } from './app.po';

describe('yaw App', function() {
  let page: YawPage;

  beforeEach(() => {
    page = new YawPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
