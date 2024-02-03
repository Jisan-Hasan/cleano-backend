/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../shared/prisma';

export const getNewOrderNumber = async () => {
  const previousOrder = await prisma.order.findFirst({
    where: {
      // order number stated with today's date
      orderNumber: {
        startsWith: new Date().toISOString().split('T')[0],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      orderNumber: true,
    },
  });

  // if previous order number does not exist
  // set order number to 1
  let orderNumber = null;
  if (!previousOrder) {
    orderNumber = `${new Date().toISOString().split('T')[0]}-000001`;
  } else {
    // extract order number from previous order number
    const previousOrderNumber = previousOrder.orderNumber.split('-')[3];
    // increment order number by 1
    const newOrderNumber = parseInt(previousOrderNumber, 10) + 1;
    // prepare order number
    // example: "2021-09-12-000001"
    orderNumber = `${new Date().toISOString().split('T')[0]}-${newOrderNumber
      .toString()
      .padStart(6, '0')}`;
  }

  return orderNumber;
};

export const getOrderServices = async (services: any) => {
  const serviceIds = services.map((service: any) => service.id);

  const dbServices = await prisma.service.findMany({
    where: {
      id: {
        in: serviceIds,
      },
    },
    select: {
      id: true,
      title: true,
      price: true,
    },
  });

  const orderServices = services.map((service: any) => {
    const dbService = dbServices.find(
      (dbService: any) => dbService.id === service.id
    );

    return {
      service_id: dbService?.id,
      name: dbService?.title,
      price: dbService?.price,
      quantity: service.quantity,
    };
  });

  const total = orderServices.reduce(
    (acc: number, service: any) =>
      acc + (service.price as number) * service.quantity,
    0
  );

  return {
    orderServices,
    total,
  };
};
