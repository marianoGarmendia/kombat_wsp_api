// Luego de que llega un mensaje o se envia un mensaje desde el bot hacia el cliente empiezan a suceder eventos

// El primer evento es "sent" que se dispara cuando el mensaje es enviado correctamente
// El objeto que llega como evento es el siguiente:

const sentEvent = {
    object: 'whatsapp_business_account',
    entry: [
      {
        id: '473853462488396',
        changes: [
          {
            value: {
              messaging_product: 'whatsapp',
              metadata: {
                display_phone_number: '5492216559075',
                phone_number_id: '561091527089092'
              },
              statuses: [
                {
                  id: 'wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEkE2MjE0OUQ4REREMTlCODI3MQA=',
                  status: 'sent',
                  timestamp: '1742668003',
                  recipient_id: '5492214371684',
                  conversation: {
                    id: '4e5cfdb945c0900f0dca0ef228827422',
                    expiration_timestamp: '1742754420',
                    origin: { type: 'service' }
                  },
                  pricing: {
                    billable: true,
                    pricing_model: 'CBP',
                    category: 'service'
                  }
                }
              ]
            },
            field: 'messages'
          }
        ]
      }
    ]
  }

  // Luego llega "delivered"

  const deliveredEvent = {
    object: 'whatsapp_business_account',
    entry: [
      {
        id: '473853462488396',
        changes: [
          {
            value: {
              messaging_product: 'whatsapp',
              metadata: {
                display_phone_number: '5492216559075',
                phone_number_id: '561091527089092'
              },
              statuses: [
                {
                  id: 'wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEkE2MjE0OUQ4REREMTlCODI3MQA=',
                  status: 'delivered',
                  timestamp: '1742668003',
                  recipient_id: '5492214371684',
                  conversation: {
                    id: '4e5cfdb945c0900f0dca0ef228827422',
                    origin: { type: 'service' }
                  },
                  pricing: {
                    billable: true,
                    pricing_model: 'CBP',
                    category: 'service'
                  }
                }
              ]
            },
            field: 'messages'
          }
        ]
      }
    ]
  }

  // Luego llega el "read"

  const readEvent = {
    object: 'whatsapp_business_account',
    entry: [
      {
        id: '473853462488396',
        changes: [
          {
            value: {
              messaging_product: 'whatsapp',
              metadata: {
                display_phone_number: '5492216559075',
                phone_number_id: '561091527089092'
              },
              statuses: [
                {
                  id: 'wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEkE2MjE0OUQ4REREMTlCODI3MQA=',
                  status: 'read',
                  timestamp: '1742668003',
                  recipient_id: '5492214371684'
                }
              ]
            },
            field: 'messages'
          }
        ]
      }
    ]
  }