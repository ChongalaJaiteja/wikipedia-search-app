import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { useAuthContext } from "../../authContext";
import PageView from "../pageView";
import * as StyledComponent from "./styledComponent";

const History = () => {
    const [historyList, setHistoryList] = useState([]);
    const [historyError, sethistoryError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { jwtToken } = useAuthContext();
    const limit = 10;

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const url = "http://localhost:3001/history";
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: "GET",
            };
            const response = await fetch(url, options);
            const data = await response.json();
            console.log("formatted date", data);
            setHistoryList(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const images = {
        reload: "https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1694927530~exp=1694928130~hmac=a1cb06f612d499000afda3bcecd029ad306e5b0635f232e33665d58e0ec9f4f1",
        noResults:
            "https://img.freepik.com/free-vector/flat-design-no-data-illustration_23-2150527142.jpg?w=740&t=st=1695036731~exp=1695037331~hmac=a793ff5dde6918e306e53726059eb01dd5fa0b560067e4e9df6e20a3d4715314",
    };

    const renderHistory = () => (
        <>
            <ul>
                {historyList.map(({ date, history }) => (
                    <>
                        <li key={date}>{date}</li>
                        {history.map(({ historyId, time, title, url }) => (
                            <>
                                <li key={historyId}>{title}</li>
                                <li>
                                    <a href={url}>{title}</a>
                                </li>
                            </>
                        ))}
                    </>
                ))}
            </ul>
            )}
        </>
    );

    const svgLoader = (
        <ContentLoader
            speed={0.3}
            width="100%"
            height={124}
            viewBox="0 0 100% 124"
            backgroundColor="#e6e6e6"
            foregroundColor="#d4d4d4"
        >
            <rect x="4" y="28" rx="10" ry="10" width="70%" height="18" />
            <rect x="4" y="52" rx="10" ry="10" width="99%" height="43" />
            <rect x="5" y="6" rx="10" ry="10" width="20%" height="17" />
        </ContentLoader>
    );
    const renderViews = {
        fetchData: fetchHistory,
        loadingView: { isLoading, svgLoader, limit },
        successView: {
            data: historyList,
            renderResults: renderHistory,
            notFoundImageUrl: images.noResults,
        },
        failureView: {
            reloadImageUrl: images.reload,
            reloadText: "Retry",
            error: historyError,
        },
    };

    return <PageView renderViews={renderViews} />;
};
export default History;
