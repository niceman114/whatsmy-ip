import ReactGA from "react-ga4";

// 반환 타입 정의
interface GA {
  pageview: () => void;
  event: (action: string, category: string, label: string, value: number) => void;
}

const ga = (): GA => {
  return {
    pageview: () => {
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname,
      });
    },
    event: (action: string, category: string, label: string, value: number) => {
      ReactGA.event({
        action: action,
        category: category,
        label: label,
        value: value,
      });
    },
  };
};

export default ga;
