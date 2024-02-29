import moment from "moment";
import React from "react";
import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";

interface Props {
  title: string
  date: string
  wordCount: string
  inject: boolean
}

interface Env { }


export const onRequest: PagesFunction<Env> = async (context) => {
  const fontData = await fetch(new URL('https://use.typekit.net/af/89996a/000000000000000077359445/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3')).then(
    (res) => res.arrayBuffer(),
  );

  return vercelOGPagesPlugin<Props>({
    imagePathSuffix: "og-image.png",
    component: ({ title, date, wordCount }) => {
      return (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '-.02em',
            background: '#fbf9ea',
          }}
        >
          <div
            style={{
              left: 50,
              top: 50,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              width="60"
              height="60"
              src={`https://avatars.githubusercontent.com/u/13177755?v=4`}
              style={{
                borderRadius: 128,
              }}
            />
            <span
              style={{
                marginLeft: 8,
                fontSize: 20,
                color: "#32302f"
              }}
            >
              saligrama.io/blog
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '20px 50px',
              margin: '0 42px',
              fontSize: 32,
              width: 'auto',
              maxWidth: 800,
              textAlign: 'center',
              color: '#619e4c',
              fontFamily: 'IBM Plex Sans',
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>

          <div
            style={{
              left: 100,
              bottom: 50,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                marginLeft: 8,
                fontSize: 20,
                color: "#c76680"
              }}
            >
              {date}
            </span>
          </div>

          <div
            style={{
              right: 100,
              bottom: 50,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                marginLeft: 8,
                fontSize: 20,
                color: "#c76680"
              }}
            >
              {wordCount}
            </span>
          </div>
        </div>
      )
    },
    options: {
      width: 800,
      height: 400,
      fonts: [
        {
          name: 'IBM Plex Sans',
          data: fontData,
          style: 'normal',
        },
      ],
    },
    extractors: {
      on: {
        'meta[property="og:title"]': (props) => ({
          element(element: Element) {
            props.title = element.getAttribute("content")?.replace(/&#39;/g, "'") ?? "Aditya Saligrama's blog";
          }
        }),
        'meta[property="article:published_time"]': (props) => ({
          element(element: Element) {
            props.date = moment(element.getAttribute("content")).format("MMMM D, YYYY") ?? "";
          }
        }),
        'meta[property="article:word_count"]': (props) => ({
          element(element: Element) {
            props.wordCount = `${element.getAttribute("content")} words` ?? "";
          }
        }),
      }
    },
    autoInject: {
      openGraph: true,
    },
  })(context)
}