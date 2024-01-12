import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import TreeNode from './components/TreeNode';

const TreeView = ({
  treeData,
  selectedIds,
  setSelectedIds,
  checkedColor = '#00A8B9',
  switchCheckedColor = '#00A8B9',
  searchPlaceHolder = 'Enter at least 3 letters to search..',
  notFoundText = 'No Records Found.',
}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(treeData);
  const [originalData, setOriginalData] = useState(treeData);

  /////EXPAND FUNCTIONS/////
  const nodePress = (node) => {
    if (node?.subs?.length > 0) {
      const updatedTree = updateNodeExpanded(data, node.id, !node.isExpanded);
      const updatedOriginTree = updateNodeExpanded(
        originalData,
        node.id,
        !node.isExpanded
      );
      setData(updatedTree);
      setOriginalData(updatedOriginTree);
    }
  };

  const updateNodeExpanded = (nodes, targetId, isExpanded) => {
    return nodes.map((node) => {
      if (node.id === targetId) {
        return {
          ...node,
          isExpanded: isExpanded,
        };
      } else if (node.subs) {
        return {
          ...node,
          subs: updateNodeExpanded(node.subs, targetId, isExpanded),
        };
      }
      return node;
    });
  };
  /////EXPAND FUNCTIONS/////

  /////CHECKBOX FUNCTIONS/////
  const handleCheck = (node) => {
    const updatedTree = updateNodeChecked(data, node.id, !node.selected);
    const updatedOriginTree = updateNodeChecked(
      originalData,
      node.id,
      !node.selected
    );
    setData(updatedTree);
    setOriginalData(updatedOriginTree);
  };

  const updateNodeChecked = (nodes, targetId, newChecked, addArray = true) => {
    return nodes.map((node) => {
      if (node.id === targetId) {
        if (addArray) {
          setIds(targetId, newChecked);
        }

        if (node?.subs) {
          return {
            ...node,
            selected: newChecked,
            subs: updateChildrenChecked(node.subs, newChecked, addArray),
          };
        } else {
          return {
            ...node,
            selected: newChecked,
          };
        }
      } else if (node.subs) {
        return {
          ...node,
          subs: updateNodeChecked(node.subs, targetId, newChecked, addArray),
        };
      }
      return node;
    });
  };

  const updateChildrenChecked = (nodes, newChecked, addArray = true) => {
    return nodes.map((node) => {
      if (addArray) {
        setIds(node?.id, newChecked);
      }
      if (node?.subs) {
        return {
          ...node,
          selected: newChecked,
          subs: updateChildrenChecked(node.subs, newChecked, addArray),
        };
      } else {
        return {
          ...node,
          selected: newChecked,
        };
      }
    });
  };

  const setIds = (id, checked) => {
    if (checked) {
      if (!selectedIds.includes(id)) {
        setSelectedIds((prevItems) => [...prevItems, id]);
      }
    } else {
      setSelectedIds((prevItems) =>
        prevItems.filter((itemId) => itemId !== id)
      );
    }
  };
  /////CHECKBOX FUNCTIONS/////

  /////FILTER FUNCTIONS/////
  useEffect(() => {
    function filterData(keyword, nodes) {
      if (keyword?.length > 3) {
        return nodes.flatMap((node) => {
          const matched = node.name
            .toLocaleLowerCase('tr-TR')
            .includes(keyword.toLocaleLowerCase('tr-TR'));

          let newNode = {
            ...node,
            subs: matched ? node.subs : null,
          };

          if (node.subs) {
            const filteredChildren = filterData(keyword, node.subs);
            if (filteredChildren.length > 0) {
              newNode = {
                ...newNode,
                subs: filteredChildren,
              };
            }
          }

          return matched || newNode.subs ? [newNode] : [];
        });
      } else {
        return nodes;
      }
    }
    const filteredData = filterData(search, originalData);

    setData(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  /////FILTER FUNCTIONS/////

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={search}
          defaultValue={''}
          onChangeText={(txt) => {
            setSearch(txt);
          }}
          placeholder={searchPlaceHolder}
        />
      </View>

      {data?.length === 0 ? (
        <Text style={styles.notFound}>{notFoundText}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {data?.map((e, i) => {
            return (
              <TreeNode
                key={e?.id}
                node={e}
                level={0}
                nodePress={nodePress}
                handleCheck={handleCheck}
                checkedColor={checkedColor}
                switchCheckedColor={switchCheckedColor}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
  },
  wrapItemInner: {
    justifyContent: 'flex-start',
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    marginLeft: 5,
    flexShrink: 1,
  },
  container: {
    flexShrink: 1,
    flexDirection: 'row',
    height: 52,
    width: '100%',
    borderColor: '#ECF1F6',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  textInput: {
    color: '#78828A',
    height: 40,
    flex: 1,
  },
  notFound: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default TreeView;
