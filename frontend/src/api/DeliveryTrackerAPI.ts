// api.js
export const getTrackingInfo = async (carrierId : string, trackingNumber : string) => {
    const response = await fetch("https://apis.tracker.delivery/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `TRACKQL-API-KEY 7lbeq73am80t54r3rs7l6vjnnv:103eufmav4298s8ms4581nkffhmajqg20qmbmco1uoig535775j8`,
      },
      body: JSON.stringify({
        query: `
          query Track($carrierId: ID!, $trackingNumber: String!) {
            track(carrierId: $carrierId, trackingNumber: $trackingNumber) {
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
          }
        `.trim(),
        variables: {
          carrierId,
          trackingNumber,
        },
      }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  };
  