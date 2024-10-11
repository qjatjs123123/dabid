let trackResponse = await fetch('https://apis.tracker.delivery/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Instructions for obtaining [YOUR_CLIENT_ID] and [YOUR_CLIENT_SECRET] can be found in the documentation below:
    // See: https://tracker.delivery/docs/authentication
    Authorization: 'TRACKQL-API-KEY 3u6qckubnjghqidq5t0kn302ho:1lm9le6otq0lo0oj8fbn10lhjf1a5384rdjqtihqufeuqag63lbb',
  },
  body: JSON.stringify({
    query: `query Track(
    $carrierId: ID!,
    $trackingNumber: String!
  ) {
    track(
      carrierId: $carrierId,
      trackingNumber: $trackingNumber
    ) {
      lastEvent {
        time
        status {
          code
          name
        }
        description
      }
      events(last: 10) {
        edges {
          node {
            time
            status {
              code
              name
            }
            description
          }
        }
      }
    }
  }`.trim(),
    variables: {
      carrierId: 'kr.coupangls',
      trackingNumber: '10273059153523',
    },
  }),
});
console.log(JSON.stringify(await trackResponse.json()));
/*
  let edges = {
    lastEvent: {
      time: '2024-09-30T05:08:35.000+09:00',
      status: {
        code: 'DELIVERED',
        name: '배송출발',
      },
      description: '배송완료 - 안양1',
    },
    events: {
      edges: [
        {
          node: {
            time: '2024-09-29T23:44:24.000+09:00',
            status: {
              code: 'IN_TRANSIT',
              name: '집하',
            },
            description: '집하 - 평택2HUB',
          },
        },
        {
          node: {
            time: '2024-09-30T01:55:09.000+09:00',
            status: {
              code: 'IN_TRANSIT',
              name: '캠프도착',
            },
            description: '캠프도착 - 안양1',
          },
        },
        {
          node: {
            time: '2024-09-30T02:56:55.000+09:00',
            status: {
              code: 'OUT_FOR_DELIVERY',
              name: '배송출발',
            },
            description: '배송출발 - 안양1',
          },
        },
      ],
    },
  };
*/
