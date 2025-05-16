import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import CodeMirror from "@uiw/react-codemirror";
import "bootstrap/dist/css/bootstrap.min.css";

const languages = [
  {
    name: "Python",
    code: `import pandas as pd
import numpy as np

# Load OHLC data from Excel
def load_data(file_path, sheet_name):
    df = pd.read_excel(file_path, sheet_name=sheet_name, parse_dates=['Date'])
    df.set_index('Date', inplace=True)
    return df

# Simple backtesting strategy with trailing stop loss
def backtest_with_trailing_stop(data, entry_signal, exit_signal, trailing_stop=0.02):
    capital = 10000  # Initial capital
    position = 0  # 1 for long, -1 for short, 0 for none
    entry_price = 0
    stop_price = 0
    trades = []
    
    for i in range(1, len(data)):
        if position == 0:
            if entry_signal(data, i):
                position = 1  # Long position
                entry_price = data['Close'].iloc[i]
                stop_price = entry_price * (1 - trailing_stop)
                trades.append((data.index[i], 'BUY', entry_price))
        
        elif position == 1:
            stop_price = max(stop_price, data['Close'].iloc[i] * (1 - trailing_stop))
            if exit_signal(data, i) or data['Close'].iloc[i] <= stop_price:
                position = 0
                exit_price = data['Close'].iloc[i]
                capital *= (exit_price / entry_price)
                trades.append((data.index[i], 'SELL', exit_price))
    
    return trades, capital

# Example entry and exit signals
def entry_signal(data, i):
    return data['Close'].iloc[i] > data['Close'].iloc[i-1]  # Simple uptrend entry

def exit_signal(data, i):
    return data['Close'].iloc[i] < data['Close'].iloc[i-1]  # Simple downtrend exit

# Run backtest
file_path = "ohlc_data.xlsx"
sheet_name = "Sheet1"
data = load_data(file_path, sheet_name)
trades, final_capital = backtest_with_trailing_stop(data, entry_signal, exit_signal, trailing_stop=0.02)

# Output results
print("Trades:")
for trade in trades:
    print(trade)

print(f"Final Capital: {final_capital:.2f}")`,
  },
  {
    name: "JavaScript",
    code: `const XLSX = require('xlsx');
const fs = require('fs');

// Load OHLC data from Excel
function loadData(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
    
    return jsonData.map(row => ({
        date: new Date(row.Date),
        open: parseFloat(row.Open),
        high: parseFloat(row.High),
        low: parseFloat(row.Low),
        close: parseFloat(row.Close)
    }));
}

// Simple backtesting strategy with trailing stop loss
function backtestWithTrailingStop(data, entrySignal, exitSignal, trailingStop = 0.02) {
    let capital = 10000; // Initial capital
    let position = 0; // 1 for long, 0 for none
    let entryPrice = 0;
    let stopPrice = 0;
    let trades = [];

    for (let i = 1; i < data.length; i++) {
        if (position === 0) {
            if (entrySignal(data, i)) {
                position = 1; // Long position
                entryPrice = data[i].close;
                stopPrice = entryPrice * (1 - trailingStop);
                trades.push({ date: data[i].date, type: 'BUY', price: entryPrice });
            }
        } else if (position === 1) {
            stopPrice = Math.max(stopPrice, data[i].close * (1 - trailingStop));
            if (exitSignal(data, i) || data[i].close <= stopPrice) {
                position = 0;
                const exitPrice = data[i].close;
                capital *= (exitPrice / entryPrice);
                trades.push({ date: data[i].date, type: 'SELL', price: exitPrice });
            }
        }
    }

    return { trades, finalCapital: capital };
}

// Example entry and exit signals
function entrySignal(data, i) {
    return data[i].close > data[i - 1].close; // Simple uptrend entry
}

function exitSignal(data, i) {
    return data[i].close < data[i - 1].close; // Simple downtrend exit
}

// Run backtest
const filePath = 'ohlc_data.xlsx';
const sheetName = 'Sheet1';
const data = loadData(filePath, sheetName);
const { trades, finalCapital } = backtestWithTrailingStop(data, entrySignal, exitSignal, 0.02);

// Output results
console.log('Trades:');
trades.forEach(trade => console.log(trade));

`,
  },
  {
    name: "Java",
    code: `import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

class OHLC {
    Date date;
    double open, high, low, close;

    public OHLC(Date date, double open, double high, double low, double close) {
        this.date = date;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
    }
}

class Trade {
    Date date;
    String type;
    double price;

    public Trade(Date date, String type, double price) {
        this.date = date;
        this.type = type;
        this.price = price;
    }
}

public class Backtest {
    public static List<OHLC> loadData(String filePath, String sheetName) throws IOException {
        List<OHLC> data = new ArrayList<>();
        FileInputStream file = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(file);
        Sheet sheet = workbook.getSheet(sheetName);

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // Skip header
            Date date = row.getCell(0).getDateCellValue();
            double open = row.getCell(1).getNumericCellValue();
            double high = row.getCell(2).getNumericCellValue();
            double low = row.getCell(3).getNumericCellValue();
            double close = row.getCell(4).getNumericCellValue();
            data.add(new OHLC(date, open, high, low, close));
        }
        workbook.close();
        return data;
    }

    public static boolean entrySignal(List<OHLC> data, int i) {
        return data.get(i).close > data.get(i - 1).close;
    }

    public static boolean exitSignal(List<OHLC> data, int i) {
        return data.get(i).close < data.get(i - 1).close;
    }

    public static void backtestWithTrailingStop(List<OHLC> data, double trailingStop) {
        double capital = 10000;
        int position = 0;
        double entryPrice = 0;
        double stopPrice = 0;
        List<Trade> trades = new ArrayList<>();

        for (int i = 1; i < data.size(); i++) {
            if (position == 0 && entrySignal(data, i)) {
                position = 1;
                entryPrice = data.get(i).close;
                stopPrice = entryPrice * (1 - trailingStop);
                trades.add(new Trade(data.get(i).date, "BUY", entryPrice));
            } else if (position == 1) {
                stopPrice = Math.max(stopPrice, data.get(i).close * (1 - trailingStop));
                if (exitSignal(data, i) || data.get(i).close <= stopPrice) {
                    position = 0;
                    double exitPrice = data.get(i).close;
                    capital *= (exitPrice / entryPrice);
                    trades.add(new Trade(data.get(i).date, "SELL", exitPrice));
                }
            }
        }

        System.out.println("Trades:");
        for (Trade trade : trades) {
            System.out.println(trade.date + " " + trade.type + " at " + trade.price);
        }
        System.out.println("Final Capital: " + String.format("%.2f", capital));
    }

    public static void main(String[] args) {
        try {
            String filePath = "ohlc_data.xlsx";
            String sheetName = "Sheet1";
            List<OHLC> data = loadData(filePath, sheetName);
            backtestWithTrailingStop(data, 0.02);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,
  },
];

export const AnalyzeDocument = ({ isCompleted }: any) => {
  console.log("is", isCompleted);
  const [show, setShow] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [activeLanguage, setActiveLanguage] = useState<any>("");
  const handleShow = (lang: any) => {
    setSelectedLang(lang);
    setShow(true);
  };

  return (
    <div className="toolkit-card code">
      <p className="toolkit-main-title">Analyze And Create Backtest Code</p>
      <hr className="custom-line mb-4" />
      <p className="toolkit-main-text mb-3">Select Language</p>
      <div className="d-flex  gap-3">
        {languages.map((lang) => (
          <div
            className={`${
              activeLanguage === lang && "code-active-card"
            } c-pointer border border-white p-2 rounded drag-drop-area`}
            onClick={() => setActiveLanguage(lang)}
            key={lang.name}
          >
            <p className="toolkit-main-text">{lang.name}</p>
          </div>
        ))}
      </div>
      {isCompleted && (
        <div className="d-flex justify-content-center">
          <button
            onClick={() => {
              handleShow(activeLanguage);
            }}
            className="btn mainButton px-3 py-2 mt-4"
          >
            <p className="toolkit-main-text">See Code</p>
          </button>
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
        <Modal.Header closeButton>
          <Modal.Title>{selectedLang.name} Backtest Kodu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <CodeMirror
            value={selectedLang.code}
            options={{
              mode: "javascript",
              theme: "material",
              lineNumbers: true,
            }}
          /> */}
        </Modal.Body>
        <Modal.Footer>
          {/* <CopyToClipboard text={selectedLang.code}>
            <Button variant="success">Save Code</Button>
          </CopyToClipboard> */}
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
