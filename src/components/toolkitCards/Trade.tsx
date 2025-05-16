import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const generateFakeOHLC = () => {
  let price = 3.0;
  return Array.from({ length: 20 }, (_, i) => {
    let open = price;
    let close = open + (Math.random() * 0.5 - 0.25);
    let high = Math.max(open, close) + Math.random() * 0.2;
    let low = Math.min(open, close) - Math.random() * 0.2;
    price = close;
    return { time: i, open, high, low, close };
  });
};

export const Trade = ({ isCompleted = false }: any) => {
  const [ohlcData, setOhlcData] = useState(generateFakeOHLC());
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [priceIndex, setPriceIndex] = useState(0);
  const [position, setPosition] = useState<any>(null);
  console.log("iscom", isCompleted);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Balance",
        data: [],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  });
  const handleShow = (lang: any) => {
    setShow(true);
  };

  useEffect(() => {
    if (transactions.length > 0) {
      setChartData(
        (prev) =>
          ({
            labels: transactions.map((_, index) => index),
            datasets: [
              {
                ...prev.datasets[0],
                data: transactions.map((t: any) => t.balance),
              },
            ],
          } as any)
      );
    }
  }, [transactions]);

  useEffect(() => {
    if (isCompleted && priceIndex < ohlcData.length - 1) {
      const interval = setInterval(() => {
        let newBalance = balance;
        let newTransactions: any = [...transactions];

        if (!position) {
          const buyPrice = ohlcData[priceIndex].close;
          newTransactions.push({
            type: "Buy",
            price: buyPrice,
            balance: newBalance,
          });
          setPosition(buyPrice);
          newBalance -= buyPrice * 10;
        } else {
          const sellPrice = ohlcData[priceIndex].close;
          const profit = (sellPrice - position) * 10;
          newBalance += profit + position * 10;
          newTransactions.push({
            type: "Sell",
            price: sellPrice,
            balance: newBalance,
          });
          setPosition(null);
        }

        setTransactions(newTransactions);
        setBalance(newBalance);
        setPriceIndex((prevIndex) => prevIndex + 1);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isCompleted, priceIndex, ohlcData, position, balance, transactions]);

  return (
    <div className="toolkit-card code">
      <p className="toolkit-main-title">Trade</p>
      <hr className="custom-line mb-4" />
      {isCompleted ? (
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <p className="toolkit-main-text">Balance: {balance}</p>
          </div>
          <div className="d-flex align-items-center gap-2 mt-4">
            <button
              onClick={() => {
                setShow(true);
              }}
              className="btn mainButton px-3 py-2"
            >
              <p className="toolkit-main-text">See Details</p>
            </button>

            <button className="btn btn-danger btn-sm">Stop Bot</button>
          </div>
        </div>
      ) : (
        <div className="mt-4 ">
          <p className="toolkit-main-text mb-2">Trade Balance</p>
          <input
            onChange={(e) => {
              setBalance(Number(e.target.value));
            }}
            className="form-control toolkit"
            type="text"
          />
        </div>
      )}

      <Modal
        style={{ zIndex: 9999 }}
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        centered
        className="normal"
      >
        <Modal.Header closeButton>Balance : {balance.toFixed(3)}</Modal.Header>
        <Modal.Body>
          <div className="row">
            <div
              style={{ maxHeight: "200px", overflow: "auto" }}
              className="col-lg-6"
            >
              <div className="mt-4">
                {transactions.map((t: any, index) => (
                  <Card
                    key={index}
                    className={`p-2 mb-2 ${
                      t.type === "Buy" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    <p className="text-white">
                      {t.type} at ${t.price.toFixed(2)}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mt-4">
                <Line data={chartData} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
