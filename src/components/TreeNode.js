import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Switch } from 'react-native';

const TreeNode = ({
  node,
  level,
  nodePress,
  handleCheck,
  checkedColor,
  switchCheckedColor,
}) => {
  function getIndicator(isExpanded, checked) {
    return (
      <Text
        style={{
          fontSize: !node.subs?.length ? 15 : 25,
          color: checked ? checkedColor : '#66707A',
        }}
      >
        {!node.subs?.length ? '●' : !isExpanded ? '▸' : '▾'}
      </Text>
    );
  }

  return (
    <>
      <View
        style={[
          styles.wrapItem,
          {
            marginLeft: 15 * level,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            nodePress(node);
          }}
          style={styles.wrapItemInner}
        >
          {getIndicator(node?.isExpanded, node?.selected)}
          <Text numberOfLines={1} style={styles.name}>
            {node.name}
          </Text>
        </TouchableOpacity>

        <Switch
          trackColor={{ false: '#a8a7a7', true: switchCheckedColor }}
          thumbColor={true ? 'white' : 'grey'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => {
            handleCheck(node);
          }}
          value={node?.selected}
        />
      </View>
      {node?.isExpanded &&
        node?.subs &&
        node?.subs?.length > 0 &&
        node?.subs?.map((e, i) => {
          return (
            <TreeNode
              key={e?.id}
              node={e}
              level={level + 1}
              nodePress={nodePress}
              handleCheck={handleCheck}
              checkedColor={checkedColor}
              switchCheckedColor={switchCheckedColor}
            />
          );
        })}
    </>
  );
};

export default TreeNode;

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
});
