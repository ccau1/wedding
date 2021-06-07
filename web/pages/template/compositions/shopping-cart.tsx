import TemplateLayout from "@layouts/templateLayout";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import Button from "components/button";
import Card from "components/card";
import Divider from "components/divider";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

const MAX_QUANTITY = 10;

const ShoppingCartCompositionPage = () => {
  const [items, setItems] = useState(mockItems);

  return (
    <TemplateLayout>
      <div className="grid md:grid-cols-1 grid-cols-3 gap-3">
        {/* left col panels */}
        <div className="md:col-span-1 col-span-2">
          <Card>
            <h5>Cart ({items.length})</h5>
            {items?.length > 0 && (
              <motion.div
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.8 } },
                }}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence>
                  {items.map((item, itemIndex) => (
                    <motion.div
                      key={item._id}
                      className={twCascade(
                        "lg:flex grid grid-cols-6 lg:grid-cols-5 gap-2 py-5 border-gray-300 border-dashed overflow-hidden",
                        itemIndex > 0 && "border-t"
                      )}
                      variants={{
                        hidden: { opacity: 0, translateX: -30 },
                        show: { opacity: 1, translateX: 0 },
                        exit: {
                          opacity: 0,
                          transition: { duration: 0.3 },
                        },
                      }}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                    >
                      {/* product image */}
                      <div className="w-24 h-24 overflow-hidden">
                        <img
                          src={item.images?.[0]}
                          className="w-24 h-24 object-contain transform hover:scale-125 hover:opacity-40 transition-all duration-700"
                        />
                      </div>
                      {/* text section */}
                      <div className="col-span-3 flex flex-col flex-1">
                        <p>{item.name}</p>
                        <small>{item.description}</small>
                        {item.attributes &&
                          Object.keys(item.attributes).length && (
                            <div className="py-2">
                              {Object.keys(item.attributes).map((attrKey) => (
                                <small key={attrKey} className="block">
                                  <strong className="text-gray-400">
                                    {attrKey.toUpperCase()}
                                  </strong>
                                  {" : "}
                                  {item.attributes[attrKey].toUpperCase()}
                                </small>
                              ))}
                            </div>
                          )}
                        <div className="flex-1" />
                        <div className="mt-3 flex justify-start">
                          <a
                            onClick={() =>
                              setItems(
                                items.filter(
                                  (itemFilter) => itemFilter._id !== item._id
                                )
                              )
                            }
                            className="flex items-center text-xs cursor-pointer hover:text-gray-500 active:text-gray-200 select-none"
                          >
                            <FaTrashAlt size={15} className="mr-1" />
                            REMOVE ITEM
                          </a>
                        </div>
                      </div>
                      {/* quantity */}
                      <div className="flex flex-col">
                        <div className="flex">
                          <a
                            onClick={() =>
                              item.quantity > 1 &&
                              setItems(
                                items.map((thisItem) => ({
                                  ...thisItem,
                                  ...(thisItem._id === item._id && {
                                    quantity: item.quantity - 1,
                                  }),
                                }))
                              )
                            }
                            className={twCascade(
                              "border border-gray-200 block p-2 cursor-pointer text-gray-700 select-none",
                              item.quantity <= 1 &&
                                "cursor-default text-gray-300"
                            )}
                          >
                            <FaMinus size={10} />
                          </a>
                          <input
                            type="number"
                            value={item.quantity}
                            className="no-arrows w-14 px-1 text-center appearance-none m-0"
                            onChange={(ev) => {
                              console.log("onchange", ev.target.value);
                              setItems(
                                items.map((thisItem) => ({
                                  ...thisItem,
                                  ...(thisItem._id === item._id && {
                                    quantity: parseInt(ev.target.value, 10),
                                  }),
                                }))
                              );
                            }}
                            min={1}
                            max={10}
                            step={1}
                          />
                          <a
                            onClick={() =>
                              item.quantity < MAX_QUANTITY &&
                              setItems(
                                items.map((thisItem) => ({
                                  ...thisItem,
                                  ...(thisItem._id === item._id && {
                                    quantity: item.quantity + 1,
                                  }),
                                }))
                              )
                            }
                            className={twCascade(
                              "border border-gray-200 block p-2 cursor-pointer text-gray-700 select-none",
                              item.quantity >= MAX_QUANTITY &&
                                "cursor-default text-gray-300"
                            )}
                          >
                            <FaPlus size={10} />
                          </a>
                        </div>
                        <div className="flex-1" />
                        <p className="text-right hidden lg:block">
                          <strong>${item.unitAmount * item.quantity}</strong>
                        </p>
                      </div>
                      {/* total amount */}
                      <p className="text-right block lg:hidden">
                        <strong>${item.unitAmount * item.quantity}</strong>
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </Card>
        </div>
        {/* right col panels */}
        <div>
          {/* pricing summary */}
          <Card>
            <h5 className="mb-3">The total amount of</h5>
            {items.map((item) => (
              <div key={item._id} className="flex justify-between pb-4">
                <p className="flex-1">{item.name}</p>
                <p>${item.quantity * item.unitAmount}</p>
              </div>
            ))}
            <Divider />
            <div className="flex justify-between pt-4 font-bold">
              <h6 className="flex-1">The total amount of (including VAT)</h6>
              <h6>
                {items.reduce(
                  (sum, item) => sum + item.quantity * item.unitAmount,
                  0
                )}
              </h6>
            </div>
            <Button className="w-full mt-8" text="CHECKOUT" />
          </Card>
          {/* discount code */}
          <Card className="mt-4 p-4">
            <p className="text-gray-500 mb-4">DISCOUNT CODE</p>
            <input
              type="text"
              className="rounded-lg p-2 border border-gray-200 w-full"
              placeholder="enter coupon code"
            />
          </Card>
        </div>
      </div>
    </TemplateLayout>
  );
};

export default ShoppingCartCompositionPage;

const mockItems = [
  {
    _id: "60af0edf2075cb2a58db4f78",
    images: [
      "https://cdn.shopify.com/s/files/1/0382/4258/2668/products/T-ShirtFinal_860x.jpg?v=1588348788",
      "https://www.terranovastyle.com/pub/media/catalog/product/s/n/snoopyr-t-shirt-16-sab0045746001s119-kw-t-shirt-mc-kw-rosa_4_2.jpg",
    ],
    name: "Bozo T-Shirt (S)",
    description: "limited edition 200th anniversary neon fashion",
    attributes: {
      size: "small",
      color: "blue",
    },
    quantity: 1,
    unitAmount: 1200,
  },
  {
    _id: "60af0f152a05dd360aa8b959",
    images: [],
    name: "Bozo T-Shirt (S)",
    description: "limited edition 200th anniversary neon fashion",
    quantity: 1,
    unitAmount: 1200,
  },
  {
    _id: "60af0f19a679ce7299e803f5",
    images: [],
    name: "Bozo T-Shirt (S)",
    description: "limited edition 200th anniversary neon fashion",
    quantity: 1,
    unitAmount: 1200,
  },
  {
    _id: "60af0f1d6db8c236b025bb71",
    images: [],
    name: "Bozo T-Shirt (S)",
    description: "limited edition 200th anniversary neon fashion",
    quantity: 1,
    unitAmount: 1200,
  },
];
