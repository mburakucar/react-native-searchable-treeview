import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TreeView from 'react-native-searchable-treeview';

export default function App() {
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <View style={styles.container}>
      <TreeView
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        treeData={[
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
        ]}
        checkedColor={'#1E90FF'}
        switchCheckedColor={'#1E90FF'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginHorizontal: 15,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
