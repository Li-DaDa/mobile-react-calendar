import React, { PureComponent } from 'react';
import './animate.css'

class Animation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isInnerShow: false,
            animationClass: '',
        };
    }

    componentWillReceiveProps(props) {
        const { isShow } = props;
        if (isShow) {
            this.show().then(() => {
                this.doShowAnimation();
            });
        } else {
            this.doFadeAnimation();
        }
    }

    handleAnimationEnd() {
        const isFading = this.state.animationClass === this.className(this.props.leave);
        if (isFading) {
            this.hide();
        }
    }

    show() {
        return new Promise(resolve => {
            this.setState(
                {
                    isInnerShow: true,
                },
                () => {
                    resolve();
                }
            );
        });
    }

    hide() {
        this.setState({
            isInnerShow: false,
        });
    }

    doShowAnimation() {
        this.setState({
            animationClass: this.className(this.props.enter),
        });
    }

    doFadeAnimation() {
        this.setState({
            animationClass: this.className(this.props.leave),
        });
    }

    /**
     * 获取className
     * @param {string} inner 'showing' | 'fading'
     */
    className(inner) {
        return `${inner}`;
    }

    render() {
        let { children } = this.props;
        children = React.Children.only(children);
        const { isInnerShow, animationClass } = this.state;
        const element = {
            ...children,
            props: {
                ...children.props,
                className: `${children.props.className} ${animationClass}`,
                onAnimationEnd: this.handleAnimationEnd.bind(this),
            },
        };
        return isInnerShow && element;
    }
}

export default Animation;
