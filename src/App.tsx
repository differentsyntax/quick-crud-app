import { ChangeEvent, useState } from "react";

const items = ["bananas", "apples", "chex-mix"];

const App = () => {
  const [itemsData, setItemsData] = useState<string[]>(items);
  const [newItem, setNewItem] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<string>("");
  const [editedItem, setEditedItem] = useState<string>("");

  const handleAdd = () => {
    if (!itemsData.includes(newItem) && newItem)
      setItemsData((prevData) => [...prevData, newItem.trim()]);
  };

  const handleAddInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.value) {
      setNewItem(e.target.value);
    }
  };

  const handleDelete = (item: string) => {
    setItemsData((prevData) => prevData.filter((x) => x != item));
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedItem(e.target.value);
  };

  const handleSaveEdit = () => {
    setItemsData((prevData) =>
      prevData.map((item) => (item == editingItem ? editedItem : item))
    );
    setEditing(false);
    setEditedItem("");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen min-w-screen">
        <div className="flex justify-start items-center">
          <input
            className="m-4 p-2 border border-gray-900 rounded-md"
            placeholder="Add new item..."
            onChange={handleAddInputChange}
          />

          <button
            className="m-4 p-2 bg-green-500 rounded-md w-20"
            onClick={handleAdd}
          >
            {"Add"}
          </button>
        </div>
        <ul>
          {itemsData.map((item, index) => (
            <li key={index}>
              <div className="flex justify-between items-center border border-gray-900 ">
                {editing && item == editingItem ? (
                  <input
                    placeholder={editingItem}
                    onChange={handleEditChange}
                    className="m-4 p-2 border border-gray-900 rounded-md"
                    value={editedItem ? editedItem : editingItem}
                  />
                ) : (
                  <p className="m-4 p-2 w-full">{item}</p>
                )}
                <div className="flex items-center justify-end w-md">
                  {!editing || item != editingItem ? (
                    <button
                      className="m-4 p-2 bg-yellow-500 rounded-md w-20"
                      onClick={() => {
                        setEditing(true);
                        setEditingItem(item);
                      }}
                    >
                      {"Edit"}
                    </button>
                  ) : (
                    <button
                      className="m-4 p-2 bg-green-500 rounded-md w-20"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                  )}
                  <button
                    className="m-4 p-2 bg-red-500 rounded-md w-20"
                    onClick={() => handleDelete(item)}
                  >
                    {"Delete"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default App;
