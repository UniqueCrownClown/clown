import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback, Alert
} from 'react-native';
const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridTd: {
        width: 80,
        height: 80,
        borderWidth: 1,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridTdText: {
        fontSize: 40,
        lineHeight: 80
    }
});
export default class Toe extends Component {
    public state: ToeState;
    private current: number = 0;
    private win: Array<string> = ['012', '345', '678', '036', '147', '258', '048', '246'];
    private oteam: Array<string> = [];
    private xteam: Array<string> = [];
    private primaryState = [
        [{ id: 0, text: '-' }, { id: 1, text: '-' }, { id: 2, text: '-' }],
        [{ id: 3, text: '-' }, { id: 4, text: '-' }, { id: 5, text: '-' }],
        [{ id: 6, text: '-' }, { id: 7, text: '-' }, { id: 8, text: '-' }]
    ];
    constructor(props: any) {
        super(props);
        this.state = {
            numbers: [
                [{ id: 0, text: '-' }, { id: 1, text: '-' }, { id: 2, text: '-' }],
                [{ id: 3, text: '-' }, { id: 4, text: '-' }, { id: 5, text: '-' }],
                [{ id: 6, text: '-' }, { id: 7, text: '-' }, { id: 8, text: '-' }]
            ]
        };
        //三种状态o,x,-
        //match胜利的八种状态值，返回胜利

    }
    //简单文本输入事件展示
    render() {
        const listItems = this.state.numbers.map((number, index) =>
            <View style={{ flexDirection: 'row' }} key={index}>
                {number.map((item, iIndex) => <TouchableNativeFeedback
                    onPress={this._onPressButton.bind(this, item.id.toString())}
                    key={iIndex}
                >
                    <View style={styles.gridTd}>
                        <Text style={styles.gridTdText}>{item.text}</Text>
                    </View>
                </TouchableNativeFeedback>)}
            </View>
        );
        return (
            <View style={styles.main}>
                {listItems}
            </View>
        );
    }

    private _onPressButton(item: string) {
        //判断是否重复点击
        const haha: Array<string> = [...this.oteam, ...this.xteam];
        const nnn: number = Number.parseInt(item);
        if (haha.includes(item)) {
            Alert.alert('请勿重复点击');
            return;
        }
        let xx = Math.floor(nnn / 3);
        let yy = nnn % 3;
        let temp = this.state.numbers;
        let empty = this.state.numbers[xx];
        empty.map((child) => {
            if (child.id.toString() === item) {
                child.text = this.current === 0 ? 'o' : 'x'
            }
        })
        // Alert.alert(JSON.stringify(empty));
        temp[xx] = empty;
        this.setState({ numbers: temp })
        if (this.current === 0) {
            this.current = 1;
            this.oteam.push(item)
        } else {
            this.current = 0;
            this.xteam.push(item)
        }
        //判断胜利
        let a = this.oteam.sort().join('');
        let b = this.xteam.sort().join('');

        console.info(a + 'ssssssssss' + this.isMatchWin(a));
        if (this.isMatchWin(a) || this.isMatchWin(b)) {
            console.info('hahahahaaa')
            this.setState({ numbers: this.primaryState });
            this.oteam = [];
            this.xteam = [];
            this.current = 0;
            if (this.isMatchWin(a)) {
                Alert.alert('oo win!!!');
            }
            if (this.isMatchWin(b)) {
                Alert.alert('xx win!!!');
            }
        }

    }

    private isMatchWin(matchStr: string): boolean {
        this.win.some(element => {
            if (matchStr.indexOf(element) !== -1) {
                return true
            }
        });
        return false
    }
}
