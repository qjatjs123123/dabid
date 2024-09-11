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
