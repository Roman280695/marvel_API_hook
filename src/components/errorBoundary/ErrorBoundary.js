import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

// предохраниетели не ловят ошибки внутри обработчиков событий
// - потому что события происходят вне метода рендер
// - не ловят ошибкт в асинхронном коде
// - не ловятся ошибки в самом предохранителе

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    // static getDerivedStateFromError (error) {
    //     return {error: true};
    // }    

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }


    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;


    }
}


export default ErrorBoundary;