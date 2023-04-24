import { PrismaClient } from "./client";

const prisma = new PrismaClient()

const main = async (): Promise<void> => {
  const creatorSale = await prisma.transactionType.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      description: 'Creator Sale',
      nature: 'INFLOW',
      signal: 'ADDITION'
    }
  })

  const affiliateSale= await prisma.transactionType.upsert({
    where: {
      id: 2,
    },
    update: {},
    create: {
      id: 2,
      description: 'Affiliate Sale',
      nature: 'INFLOW',
      signal: 'ADDITION'
    }
  })

  const paidCommission = await prisma.transactionType.upsert({
    where: {
      id: 3,
    },
    update: {},
    create: {
      id: 3,
      description: 'Paid Commission',
      nature: 'OUTFLOW',
      signal: 'SUBTRACTION'
    }
  })

  const receivedCommission =await prisma.transactionType.upsert({
    where: {
      id: 4,
    },
    update: {},
    create: {
      id: 4,
      description: 'Received Commission',
      nature: 'INFLOW',
      signal: 'ADDITION'
    }
  })

  const transactionTypes = [creatorSale, affiliateSale, paidCommission, receivedCommission]

  const wellBeingCourse = await prisma.product.upsert({
    where: {
      description: 'curso de bem-estar'  
    },
    update: {},
    create: {
      description: 'curso de bem-estar',
    }
  })

  const dominatingInvestiments = await prisma.product.upsert({
    where: {
      description: 'dominando investimentos'  
    },
    update: {},
    create: {
      description: 'dominando investimentos',
    }
  })

  const fullStackDeveloper = await prisma.product.upsert({
    where: {
      description: 'desenvolvedor full stack'  
    },
    update: {},
    create: {
      description: 'desenvolvedor full stack',
    }
  })

  const products = [wellBeingCourse, dominatingInvestiments, fullStackDeveloper]

  const davidReis = await prisma.seller.upsert({
    where: {
      name: 'david reis'
    },
    update: {},
    create: {
      email: 'david.reis@hub.la',
      name: 'david reis',
      isAdmin: true,
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
    }
  })

  const arthurOliveira = await prisma.seller.upsert({
    where: {
      name: 'arthur oliveira'
    },
    update: {},
    create: {
      email: 'arthur.oliveira@hub.la',
      name: 'arthur oliveira',
      isAdmin: true,
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6'
    }
  })

  const joseCarlos = await prisma.seller.upsert({
    where: {
      name: 'jose carlos'
    },
    update: {},
    create: {
      email: 'jose.carlos@hub.la',
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
      name: 'jose carlos',
    }
  })

  const mariaCandida = await prisma.seller.upsert({
    where: {
      name: 'maria candida'
    },
    update: {},
    create: {
      email: 'maria.candida@hub.la',
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
      name: 'maria candida',
    }
  })

  const thiagoOliveira = await prisma.seller.upsert({
    where: {
      name: 'thiago oliveira'
    },
    update: {},
    create: {
      name: 'thiago oliveira',
      email: 'thiago.oliveira@hub.la',
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
      creator: {
        connectOrCreate: {
          where: {
            name: 'jose carlos'
          },
          create: {
            email: 'jose.carlos@hub.la',
            password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
            name: 'jose carlos'
          }
        }
      }
    }
  })

  const elianaNogueira = await prisma.seller.upsert({
    where: {
      name: 'eliana nogueira'
    },
    update: {},
    create: {
      email: 'eliana.nogueira@hub.la',
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
      name: 'eliana nogueira',
    }
  })

  const carlosBatista = await prisma.seller.upsert({
    where: {
      name: 'carlos batista'
    },
    update: {},
    create: {
      email: 'carlos.batista@hub.la',
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
      name: 'carlos batista',
      creator: {
        connectOrCreate: {
          where: {
            name: 'eliana nogueira'
          },
          create: {
            email: 'eliana.nogueira@hub.la',
            password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
            name: 'eliana nogueira'
          }
        }
      }
    }
  })

  const carolinaMachado = await prisma.seller.upsert({
    where: {
      name: 'carolina machado'
    },
    update: {},
    create: {
      email:  'carolina.machado@hub.la',
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
      name: 'carolina machado',
      creator: {
        connectOrCreate: {
          where: {
            name: 'eliana nogueira'
          },
          create: {
            email: 'eliana.nogueira@hub.la',
            password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
            name: 'eliana nogueira'
          }
        }
      }
    }
  })

  const celsoDeMelo = await prisma.seller.upsert({
    where: {
      name: 'celso de melo'
    },
    update: {},
    create: {
      email: 'celso.de.melo@hub.la',
      password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
      name: 'celso de melo',
      creator: {
        connectOrCreate: {
          where: {
            name: 'eliana nogueira'
          },
          create: {
            email: 'eliana.nogueira@hub.la',
            password: '$2a$13$Ccy1/Hj4iB0I/rOn/YKrn.rqt4ILEUpHwbaWTZpEEdNR5qbo7yXD6',
            name: 'eliana nogueira'
          }
        }
      }
    }
  })

  const sellers = [
    davidReis,
    arthurOliveira,
    joseCarlos,
    mariaCandida,
    thiagoOliveira,
    elianaNogueira,
    carlosBatista,
    carolinaMachado,
    celsoDeMelo
  ]

  console.log(`database seeded with\n ${transactionTypes.length} transaction types\n ${products.length} products\n ${sellers.length} admins & sellers`)
}


main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async (): Promise<void> => { await prisma.$disconnect()})
