# react-native-searchable-treeview

Searchable treeview for react-native.

## Installation

```sh
npm install react-native-searchable-treeview

or

yarn add react-native-searchable-treeview
```

## Usage

```js
import TreeView from 'react-native-searchable-treeview';

// ...

const [selectedIds, setSelectedIds] = React.useState([]);

return (
  <TreeView
    selectedIds={selectedIds}
    setSelectedIds={setSelectedIds}
    treeData={[]}
  />
);
```

## Sample Data

```js
[
  {
    isExpanded: false,
    subs: [
      {
        isExpanded: false,
        subs: [
          {
            isExpanded: false,
            subs: [],
            id: 3,
            name: 'Node 1-1-1',
            selected: false,
            disabled: false,
          },
        ],
        id: 2,
        name: 'Node 1-1',
        selected: false,
        disabled: false,
      },
      {
        isExpanded: false,
        subs: [
          {
            isExpanded: false,
            subs: [],
            id: 5,
            name: 'Node 1-2-1',
            selected: false,
            disabled: false,
          },
        ],
        id: 4,
        name: 'Node 1-2',
        selected: false,
        disabled: false,
      },
    ],
    id: 1,
    name: 'Node 1',
    selected: false,
    disabled: false,
  },
];
```
