import React, { useState } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import './App.css';

const App = () => {
  const [items, setItems] = useState([
    { id: 'item-1', label1: 'Ustun nomi', label2: 'Key', placeholder1: 'Ustun nomi', placeholder2: 'Key' },
    { id: 'item-2', label1: 'Ustun nomi', label2: 'Key', placeholder1: 'Ustun nomi', placeholder2: 'Key' },
  ]);

  const SortableItem = SortableElement(({ value }) => (
    <div className="draggable-item">
      <div className="input-group">
        <label>{value.label1}</label>
        <input type="text" placeholder={value.placeholder1} value={value.content1}/>
      </div>
      <div className="input-group">
        <label>{value.label2}</label>
        <input type="text" placeholder={value.placeholder2} value={value.content2} />
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className="droppable-container">
        <h2>Loyiha ketma-ketligi</h2>
        {items.map((item, index) => (
          <SortableItem key={`item-${item.id}`} index={index} value={item} />
        ))}
        <div className="btn-wrapper">
          <button onClick={addNewItem}>Ustun qo'shish</button>
          <button onClick={handleSave}>Saqlash</button>
        </div>
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(prevItems => {
      const newItems = [...prevItems];
      const [movedItem] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, movedItem);
      return newItems;
    });
  };

  const addNewItem = () => {
    const newItemId = `item-${items.length + 1}`;
    const newItemContent1 = 'Ustun nomi';
    const newItemContent2 = 'Key';
    const newItemPlaceholder1 = 'Ustun nomini';
    const newItemPlaceholder2 = 'Key';
    setItems([...items, { id: newItemId, label1: newItemContent1, label2: newItemContent2, placeholder1: newItemPlaceholder1, placeholder2: newItemPlaceholder2 }]);
  };

  const handleSave = () => {
    items.forEach(item => {
      console.log(item.value);
    });
  };

  return (
    <div className="App">
      <SortableList items={items} onSortEnd={onSortEnd} axis="y" />
    </div>
  );
};

export default App;
