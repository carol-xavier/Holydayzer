import express from 'express';

const app = express();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial", month: 1 },
    { date: "1/3/2022", name: "Carnaval", month: 1 },
    { date: "4/17/2022", name: "Páscoa", month: 4 },
    { date: "4/21/2022", name: "Tiradentes", month: 4 },
    { date: "5/1/2022", name: "Dia do trabalho", month: 5 },
    { date: "6/16/2022", name: "Corpus Christi", month: 6 },
    { date: "9/7/2022", name: "Independência do Brasil", month: 9 },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida", month: 10 },
    { date: "11/2/2022", name: "Finados", month: 11 },
    { date: "11/15/2022", name: "Proclamação da República", month: 11 },
    { date: "12/25/2022", name: "Natal", month: 12 }
];

const calendar = new Map();
calendar.set(1, 'Janeiro'); calendar.set(2, 'Fevereiro');
calendar.set(3, 'Março'); calendar.set(4, 'Abril');
calendar.set(5, 'Maio'); calendar.set(6, 'Junho');
calendar.set(7, 'Julho'); calendar.set(8, 'Agosto');
calendar.set(9, 'Setembro'); calendar.set(10, 'Outubro');
calendar.set(11, 'Novembro'); calendar.set(12, 'Dezembro');

app.get("/holidays", (req, res) => {
    res.send(holidays);
});

app.get("/is-today-holiday", (req, res) => {
    const hoje = new Date();
    const today = `${hoje.toLocaleDateString()}`;
    holidays.map(isholiday => {
        if (isholiday.date === today) {
            res.send(`Sim, hoje é ${isholiday.name}`);
        }
    })
    res.send('Não, hoje não é feriado');
});

app.get("/month-holidays/:monthId", (req, res) => {
    const id = parseInt(req.params.monthId);
    const monthHolidays = holidays.filter(holiday => holiday.month === id);
    const monthName = calendar.get(id);

    if (monthHolidays.length !== 0) {
        res.send(monthHolidays);
    } else {
        res.send(`Não tem feriado em ${monthName} :(`);
    }
})

app.listen(5000);