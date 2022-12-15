import { CssBaseline } from '@nextui-org/react'
import { DocumentContext, DocumentInitialProps } from 'next/dist/pages/_document'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Children } from 'react'

class MyDocument extends Document {
  static async getInitalProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, styles: Children.toArray([initialProps.styles]) }
  }
  render() {
    return (
      <Html lang='en'>
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

