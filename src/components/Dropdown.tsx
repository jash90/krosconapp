import {Card, Icon} from "native-base";
import React, {PureComponent} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";

const CustomMenu = (props: any) => {
    let { style, children, layouts, ...other } = props;
    let { x, y, width, height } = layouts.triggerLayout;

    let position = {
        top: y + (height - 42) / 2,
        left: x,
        width: width - 56
    };

    return (
        <View {...other} style={[position, styles.contextMenu]}>
            {children}
        </View>
    );
};

interface Props {
    value: any;
    items: any[];
    onSelect: any;
    styleTitle?: any;
    styleItem?: any;
}

class DropDown extends PureComponent<Props> {
    render() {
        let { value, items, onSelect, styleTitle, styleItem } = this.props;

        return (
            <Menu renderer={CustomMenu}>
                <MenuTrigger>
                    <Card>
                        <View style={styles.containerTrigger}>
                            <Text style={[styleTitle, styles.textValue]}>
                                {value}
                            </Text>
                            <Icon
                                style={styles.icon}
                                name="arrow-dropdown"
                                fontSize={20}
                            />
                        </View>
                    </Card>
                </MenuTrigger>
                <MenuOptions style={styles.menuOptions}>
                    <FlatList
                        style={styles.styleFlatList}
                        contentContainerStyle={styles.contentFlatList}
                        data={items}
                        renderItem={({ item }) => (
                            <MenuOption
                                style={styles.menuOption}
                                onSelect={() => onSelect(item)}>
                                <Text
                                    allowFontScaling
                                    numberOfLines={1}
                                    style={[styleItem, styles.textItem]}>
                                    {item}
                                </Text>
                            </MenuOption>
                        )}
                        keyExtractor={(_item, index) => index.toString()}
                    />
                </MenuOptions>
            </Menu>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 6
    },
    contextMenu: {
        marginHorizontal: 6,
        borderRadius: 2,
        backgroundColor: "#fff",
        shadowColor: "black",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 4,
        elevation: 5
    },
    contentFlatList: {
        width: "100%"
    },
    styleFlatList: {
        width: "100%"
    },
    textItem: {
        flex: 1,
        padding: 8,
        fontSize: 14,
        lineHeight: 16
    },
    menuOption: {
        width: "100%"
    },
    menuOptions: {
        width: "100%"
    },
    textValue: {
        fontSize: 14,
        flex: 1
    },
    containerTrigger: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        width: "100%"
    }
});

export default DropDown;
