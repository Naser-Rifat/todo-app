import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [checked, setIsChecked] = useState(false);
  const [checkedId, setIsCheckedId] = useState(null);
  const [updateItemText, setUpdateItemText] = useState("");

  //checked box update
  const handleChecked = (id) => {
    setIsChecked((prev) => !prev);
    setIsCheckedId(id);
  };
  //add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      try {
        const res = await axios.post(
          "https://to-do-server-three.vercel.app/api/item",
          {
            item: itemText,
          }
        );
        setListItems((prev) => [...prev, res.data]);
        setItemText("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get(
          "https://to-do-server-three.vercel.app/api/item"
        );
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, [listItems]);

  // Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `https://to-do-server-three.vercel.app/api/item/${id}`
      );
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  };

  //Update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://to-do-server-three.vercel.app/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (err) {
      console.log(err);
    }
  };
  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form
      className="flex justify-between items-center"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="border-2 border-gray-300 rounded-lg mr-3   "
        type="text"
        placeholder="update Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button
        className="text-gray-700 w-24 py-1 bg-yellow-400 rounded-md"
        type="submit"
      >
        Update
      </button>
    </form>
  );

  return (
    <>
      <Navbar />
      <div className="App space-y-5 ">
        <h1 className="text-xl">Todo List</h1>
        <form
          className=" flex items-center relative"
          onSubmit={(e) => addItem(e)}
        >
          <input
            type="text"
            className="border-2 border-gray-500 rounded-l-lg  z-40"
            placeholder="Add Todo Item"
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            value={itemText}
          />
          <button
            type="submit"
            className="px-10 bg-green-700 py-2.5 text-white rounded-r-lg"
          >
            Add
          </button>
        </form>
        <div className="todo-listItems   bg-slate-500 p-5 rounded">
          {listItems?.map((item, index) => (
            <div
              key={item._id}
              className={`flex justify-between items-center py-2 hover:bg-slate-200 px-2    ${
                index % 2 === 0 && "bg-gray-300 "
              } ${index % 2 !== 0 && " border-2 "}`}
            >
              {isUpdating === item._id ? (
                renderUpdateForm()
              ) : (
                <>
                  <input
                    type="checkbox"
                    onChange={() => handleChecked(item?.id)}
                  />
                  <p
                  // className={`${
                  //   checked && checkedId === item?.id && "line-through"
                  // }`}
                  >
                    {item.item}
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="text-gray-700 w-24 py-1 bg-yellow-400 rounded-md"
                      onClick={() => {
                        setIsUpdating(item._id);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="text-gray-700 w-20 py-1 bg-red-400 rounded-md"
                      onClick={() => {
                        deleteItem(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
