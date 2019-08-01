import React, { PureComponent } from 'react';
import { string } from 'prop-types';

export default class Print extends PureComponent {
  static propTypes = {
    printHtml: string,
  };

  static defaultProps = {
    printHtml: 'test html',
  }

  setPageStyles = (iDom) => {
    const styles = document.getElementsByTagName('style');
    const IHead = iDom.getElementsByTagName('head')[0];
    let pageStyle = '';
    Array.from(styles).map((s) => {
      pageStyle += s.innerHTML;
    });
    const style = document.createElement('style');
    style.innerHTML = pageStyle;
    IHead.appendChild(style);
  }

  handlePrint = () => {
    const { printHtml } = this.props;
    const iFrame = this.iframe;
    const iFrameWindow = iFrame.contentWindow;
    const iDom = iFrameWindow.document;
    iDom.write(printHtml);
    this.setPageStyles(iDom);
    iDom.close();
    iFrameWindow.print();
  }

  render() {
    return (
      <div>
        <button style={{ backgroundColor: 'yellow', cursor: 'pointer' }} onClick={this.handlePrint}>print button</button>
        <iframe title="print iframe" style={{ position: 'absolute', width: '0', height: '0', left: '-500px', top: '-500px' }} ref={(iframe) => { this.iframe = iframe; }}/>
      </div>
    );
  }
}
