import { Button, Container } from "@mui/material";
import { useRef, useState } from "react";
import Input from "../Input";
import ResultBox from "../ResultBox";
import "./styles.css";

const taxes = {
    days180: 0.225,
    days181To360: 0.20,
    days361: 0.175,
}

const inputs = [
    {
        name: "money",
        label: "Quanto deseja investir (R$)"
    },
    {
        name: "percent",
        label: "Percentual de juros % (Ao mês)"
    },
    {
        name: "time",
        label: "Tempo de aplicação (Mês)"
    },
]

export default function Calculator() {
    const [amount, setAmount] = useState({
        grossTotal: 0,
        invested: 0,
        interestAmount: 0,
        tax: 0,
        incomeTax: 0,
        liquidAmount: 0,
    });
    const [isLoaded, setIsLoaded] = useState(false);

    const formRef = useRef(null);

    function calculeTax(time) {
        return time <= 5.91 ? taxes.days180 : time >= 5.92 && time <= 11.83 ? taxes.days181To360 : taxes.days361
    }

    function calculateAmount() {
        const form = formRef.current;
        const inputs = document.querySelectorAll("input");
        const money = form.money.value;
        const percent = (form.percent.value / 100);
        const time = form.time.value;

        if (money.length === 0 || percent.length === 0 || time.length === 0) {
            return;
        }

        const grossAmount = (money * (1 + percent) ** time);
        const gain = grossAmount - money;
        const incomeTax = gain * calculeTax(time);
        const finalAmount = grossAmount - incomeTax;

        setAmount({
            grossTotal: grossAmount,
            invested: money,
            interestAmount: gain,
            tax: calculeTax(time),
            incomeTax,
            liquidAmount: finalAmount
        });
        setIsLoaded(true);
    }

    return (
        <>
            <header className="header">
                <h1>Cecy <span>Invest</span></h1>
            </header>
            <main>
                <Container maxWidth="sm">
                    <h2>Simulador de Investimentos em Renda Fixa</h2>
                    <form className="form" ref={formRef}>
                        {inputs.map((input) => (
                            <Input
                                key={input.name}
                                name={input.name}
                                label={input.label}
                            />
                        ))}
                        <Button onClick={calculateAmount} variant="contained" >Calcular</Button>
                    </form>
                    <ResultBox result={amount} isLoaded={isLoaded} />
                </Container>
            </main>
        </>
    );
}