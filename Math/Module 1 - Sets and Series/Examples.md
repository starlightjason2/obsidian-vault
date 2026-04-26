# Examples

> [!example]
> Represent $f(x)=\frac{1}{1-x^2}$ with a power series.
>
> All we need to do is replace $x$ in [[6.1 - Power Series#^afec8e]] with an $x^2$.
> $$
> \begin{aligned}
> \frac{1}{1 - x} &= \sum_{n=0}^{\infty} x^n, \quad && -1 < x < 1 \\
> \frac{1}{1 - (x)^2} &= \sum_{n=0}^{\infty} (x^2)^n, && -1 < x^2 < 1 \\
> f(x) &= \sum_{n=0}^{\infty} x^{2n}, \quad && -1 < x < 1
> \end{aligned}
> $$

> [!example]
> To represent a more complicated function like $f(x)=\frac{2}{5 - x^3}$ with a power series, we can multiply each term by $\frac{2}{5}$ and replace $x$ with $\frac{1}{5}x^3$:
> $$
> \begin{aligned}
> \frac{1}{1 - x} &= \sum_{n=0}^{\infty} x^n, && \text{for } -1 < x < 1 \\
> \frac{2}{5} \cdot \frac{1}{1 - \left(\frac{1}{5}x^3\right)} &= \frac{2}{5} \sum_{n=0}^{\infty} \left(\frac{1}{5}x^3\right)^n, && \text{for } -1 < \frac{1}{5}x^3 < 1 \\
> \frac{2}{5 - x^3} &= \sum_{n=0}^{\infty} \frac{2}{5} \left( \frac{x^{3n}}{5^n} \right), && \text{for } -5 < x^3 < 5 \\
> f(x) &= \sum_{n=0}^{\infty} \frac{2x^{3n}}{5^{n+1}}, && \text{for } -\sqrt[3]{5} < x < \sqrt[3]{5}
> \end{aligned}
> $$

> [!example]
> Find the interval of convergence for
> $$
> \sum_{n=1}^{\infty} (-1)^n \frac{(x-5)^n}{\sqrt{n} \cdot 9^n}
> $$
> We can use the Ratio Test.
> $$
> \begin{align*}
> a_{n+1} &= (-1)^{n+1} \frac{(x-5)^{n+1}}{\sqrt{n+1} \cdot 9^{n+1}} \\
> a_n &= (-1)^n \frac{(x-5)^n}{\sqrt{n} \cdot 9^n} \\
> \left\lvert \frac{a_{n+1}}{a_n} \right\rvert &= \frac{(x-5)^{n+1}}{\sqrt{n+1} \cdot 9^{n+1}} \cdot \frac{\sqrt{n} \cdot 9^n}{(x-5)^n} \\
> &= \frac{(x-5)(x-5)^n}{\sqrt{n+1} \cdot 9 \cdot 9^n} \cdot \frac{\sqrt{n} \cdot 9^n}{(x-5)^n} \\
> &= \frac{(x-5)\sqrt{n}}{9\sqrt{n+1}}
> \end{align*}
> $$
> Now we can take the limit to find the interval
> $$
> \begin{align*}
> \lim_{n \to \infty} \left\lvert \frac{a_{n+1}}{a_n} \right\rvert &= \lim_{n \to \infty} \frac{(x-5)\sqrt{n}}{9\sqrt{n+1}} \\
> &= \frac{x-5}{9} \lim_{n \to \infty} \frac{\sqrt{n}}{\sqrt{n+1}} \\
> &= \frac{x-5}{9} \lim_{n \to \infty} \frac{\frac{\sqrt{n}}{\sqrt{n}}}{\frac{\sqrt{n+1}}{\sqrt{n}}} \\
> &= \frac{x-5}{9} \lim_{n \to \infty} \frac{1}{\sqrt{1 + \frac{1}{n}}} \\
> &= \frac{x-5}{9} \cdot \frac{1}{\sqrt{1 + 0}} = \frac{x-5}{9}
> \end{align*}
> $$
> So the interval is $-1 < \frac{x-5}{9} < 1$ or $-4 < x  < 14$.
>
> Let's test the endpoints $x = -4,\ x = 14$.
>
> At $x = -4$,
> $$
> \begin{align*}
> \sum_{n=1}^{\infty} (-1)^n \frac{(x-5)^n}{\sqrt{n} \cdot 9^n} &= \sum_{n=1}^{\infty} (-1)^n \frac{(-9)^n}{\sqrt{n} \cdot 9^n} \\
> &= \sum_{n=1}^{\infty} (-1)^n (-1)^n \frac{9^n}{\sqrt{n} \cdot 9^n} \\
> &= \sum_{n=1}^{\infty} (-1)^{2n} \frac{1}{\sqrt{n}} \\
> &= \sum_{n=1}^{\infty} \frac{1}{\sqrt{n}}
> \end{align*}
> $$
> Which diverges by the p-series test where $p = \frac{1}{2} < 1$.
>
> At $x = 14$,
> $$
> \begin{align*}
> \sum_{n=1}^{\infty} (-1)^n \frac{(x-5)^n}{\sqrt{n} \cdot 9^n} &= \sum_{n=1}^{\infty} (-1)^n \frac{9^n}{\sqrt{n} \cdot 9^n} \\
> &= \sum_{n=1}^{\infty} (-1)^n \frac{1}{\sqrt{n}}
> \end{align*}
> $$
> Which converges by the alternating series test where $\lim_{n \to \infty} b_n = \lim_{n \to \infty} \frac{1}{\sqrt{n}} = 0$
>
> So the final interval is
> $$
-4 < x \leq 14
> $$

> [!exm] Airy's Equation
> **Solve the differential equation**
>
> $$
> \begin{aligned}
> y'' &= xy \\
> y(0) &= a \\
> y'(0) &= b
> \end{aligned}
> $$
> ---
>
> Let's represent both sides as a power series:
>
> $$
> \begin{aligned}
> y &= \sum_{n=0}^{\infty} c_n x^n \\
> y' &= \sum_{n=1}^{\infty} c_n \cdot n x^{n-1} \\
> y'' &= \sum_{n=2}^{\infty} c_n \cdot n(n-1) x^{n-2}
> \end{aligned}
> $$
>
> Now let's evaluate our initial conditions. At $y(0)$, $y = c_0 = a$. At $y'(0)$, $y' = c_1 = b$. Substituting our power series into the differential equation, we find:
>
> $$
> \sum_{n=2}^{\infty} c_n \cdot n(n-1) x^{n-2} = \sum_{n=0}^{\infty} c_n x^{n+1}
> $$
>
> The coefficients on both sides must be equal, so we can say:
>
> $$
> \begin{aligned}
> c_2 &= 0 \\
> (2 \cdot 3)c_3 &= c_0 = a \quad \Rightarrow \quad c_3 = \frac{a}{2 \cdot 3} \\
> (3 \cdot 4)c_4 &= c_1 = b \quad \Rightarrow \quad c_4 = \frac{b}{3 \cdot 4} \\
> (4 \cdot 5)c_5 &= c_2 = 0 \quad \Rightarrow \quad c_5 = 0 \\
> (5 \cdot 6)c_6 &= c_3 \quad \Rightarrow \quad c_6 = \frac{c_3}{5 \cdot 6} = \frac{a}{2 \cdot 3 \cdot 5 \cdot 6} \\
> (6 \cdot 7)c_7 &= c_4 \quad \Rightarrow \quad c_7 = \frac{c_4}{6 \cdot 7} = \frac{b}{3 \cdot 4 \cdot 6 \cdot 7}
> \end{aligned}
> $$
>
> So the solution is:
>
> $$
> y = a + bx + \frac{a}{3 \cdot 2}x^3 + \frac{b}{3 \cdot 4}x^4 + \frac{a}{2 \cdot 3 \cdot 5 \cdot 6}x^6 + \frac{b}{3 \cdot 4 \cdot 6 \cdot 7}x^7 + \dots
> $$
>
> Factoring out the $a$'s and $b$'s, we get:
>
> $$
> y = a\left(1 + \frac{x^3}{2 \cdot 3} + \frac{x^6}{2 \cdot 3 \cdot 5 \cdot 6} + \dots\right)
> + b\left(x + \frac{x^4}{3 \cdot 4} + \frac{x^7}{3 \cdot 4 \cdot 6 \cdot 7} + \dots\right)
> $$

Let's look at an example of finding a Maclaurin series.

> [!example] Maclaurin Series for $e^{x}$
> **Find the Maclaurin Series for $f(x)=e^{x}$ and state it's interval of convergence.**
>
> Per the definition of a [[6.2 - Taylor Series#^c90d51]], We want to consider the $n$th derivative of $e^{x}$ at $x=0$. $$
\begin{align}
f^{(n)}(x)&=e^{x}\\
f^{(n)}(0)&=e^{0} \\
&=1
\end{align}$$
**So the Maclaurin series is,$$e^{x}=\sum_{n=0}^{\infty}{\frac{x^{n}}{n!}}$$**
> To find it's interval of convergence, we can use the [[Examples#^2dc2d0]].
> $$
\begin{align}
\lim_{n\to\infty}{\left\lvert {\frac{a_{n+1}}{a_{n}}} \right\rvert }&=\lim_{n\to\infty}\left\lvert {\frac{x^{n+1}}{(n+1)!}}\cdot \frac{n!}{x^{n}}\right\rvert \\
&=\lim_{n\to\infty}\left\lvert {\frac{x\cdot \cancel{x^{n}}}{(n+1)\cdot \cancel{n!}}}\cdot \frac{\cancel{n!}}{\cancel{x^{n}}}\right\rvert \\
&=\lim_{n\to\infty}\left\lvert {\frac{x}{n+1}} \right\rvert \\
&=\lvert{x}\rvert \lim_{n\to\infty}\left\lvert {\frac{1}{n+1}} \right\rvert \\
&=0
\end{align}
> $$
>
>Because the Ratio Test produced $0$, we know that the series **converges for all $x\in(-\infty,\infty)$.**

^de71fd

> [!example] Taylor Series for $\frac{1}{x}$
> **Find the [[6.2 - Taylor Series#^95d5fe]] for $f(x)=\frac{1}{x}$ at $a=6$**
> $$
> \begin{align}
> f(x)&=1\cdot x^{-1} &n=0\\ 
> f'(x)&=-1\cdot x^{-2} &n=0\\
> f''(x)&=1\cdot 2\cdot x^{-3} &n=2\\
> f'''(x)&=-3\cdot 2\cdot x^{-4} &n=3\\
> f''''(x)&=4\cdot 3\cdot 2\cdot x^{-5} & n=4\\ \\
> f^{(n)}(x)&=n!\cdot (-1)^{n}\cdot x^{-n-1} \\ \\
> f^{(n)}(a)&=n!\cdot (-1)^{n}\cdot a^{-n-1}
> \end{align}
> $$
> So the Taylor Series is
> $$
> \begin{align}
> f(x)&=\sum_{n=0}^{\infty}{\frac{(-1)^{n}\cdot \cancel{n!}\cdot a^{-n-1}}{\cancel{n!}}(x-a)^{n}} \\ \\
> &=\sum_{n=0}^{\infty}{\frac{(-1)^{n}}{a^{n+1}}(x-a)^{n}}
> \end{align}
> $$
> Centered at $x=a=6$ we have
> $$
> \frac{1}{x}=\sum_{n=0}^{\infty}{\frac{(-1)^{n}}{6^{n+1}}(x-6)^{n}}=\frac{1}{6}-\frac{1}{6^{2}}(x-6)+\frac{1}{6^{3}}(x-6)^{2}-\dots
> $$

> [!exm] Maclaurin Series for $7x^{2}e^{-3x}$
> Let $e^{x}$, let $-3x=g(x)$, and let $h(x)=7x^{2}$. Find the Maclaurin series for
> $7x^{2}e^{-3x}=h(x)\cdot f(g(x))$
>
> Using the [[6.2 - Taylor Series#^ef8304]],
>$$
>\begin{aligned}
>7x^{2}e^{-3x} &= h(x)\cdot f(g(x)) \\
>&= h(x)\sum_{n=0}^{\infty} \frac{g(x)^{n}}{n!} \\
>&= \sum_{n=0}^{\infty} h(x) \frac{g(x)^{n}}{n!} \\
>&= \sum_{n=0}^{\infty} 7x^{2} \frac{(-3x)^{n}}{n!} \\
>&= \sum_{n=0}^{\infty} \frac{7 \cdot (-1)^{n} \cdot 3^{n}}{n!} x^{n+2}
>\end{aligned}
>$$

> [!exm] Deriving Binomial Series
> We now derive a Power Series representation of the function $f(x)=(1+x)^{r},\ r\in \mathbb{R}$. Let's start by finding an expression for the $k$th derivative of $f$.
> $$
> \begin{align}
> f(x)&=(1+x)^{r} \\
> f'(x)&=(r)(1+x)^{r-1} \\
> f''(x)&=(r)(r-1)(1+x)^{r-2} \\
> f'''(x)&=(r)(r-1)(r-2)(1+x)^{r-3} \\ \\
> f^{(n)}(x)&=(r)(r-1)\dots(r-(k-1))(1+x)^{r-k}
> \end{align}
> $$
> $$
> f^{(n)}(x)=(r)(r-1)\dots(r-n+1)(1+x)^{r-n}
> $$
> $$
> \begin{align}
> \frac{r!}{(r-n)!}&=\frac{(r)(r-1)(r-2)\dots(r-n+1)\cancel{(r-n)\dots(1)}}{\cancel{(r-n)\dots(1)}} \\
> &=(r)(r-1)\dots(r-n+1)
> \end{align}
> $$
> $$
> f^{(n)}(x)=\frac{r!}{(r-n)!}(1+x)^{r-n}
> $$
> $$
> f^{(n)}(0)=\frac{r!}{(r-n)!}
> $$
> We can substitute into the formula for the [[6.2 - Taylor Series#^c90d51]] to find our series representation.
> $$
> f(x)=\sum_{n=0}^{\infty}{\frac{r!}{n!(r-n)!}x^{n}}
> $$
> Recognizing $\frac{r!}{n!(r-n)!}$ as the binomial coefficient, or as $\binom{r}{n}$, we can write a simplified Maclaurin series for $f$.
> $$
> (1+x)^{r}=\sum_{n=0}^{\infty}{\binom{r}{n}x^{n}}
> $$
> This is another way to derive the binomial theorem, and it's also called the Binomial Series.
> Let's see what this looks like for $r=2$.
> $$
> \begin{align}
> (1+x)^{2}&=\sum_{n=0}^{\infty}{\binom{2}{n}x^{n}} \\
> &=\binom{2}{0}+\binom{2}{1}x^{}+\binom{2}{2}x^{2}+\binom{2}{3}x^{3}+\dots \\
> &=1+2x^{}+1x^{2}+0x^{3}+\dots \\
> &=x^{2}+2x+1 \\
> \end{align}
> $$
> Which is the same thing we get from expanding $(1+x)^{2}=(1+x)(1+x)$.
> In general, notice that if $n>r+1$, then $r-n+1<0$ and $\exists k\in(r,r-n+1): r-k=0$. So as we decrement the factors in $\binom{r}{n}$, we cross past $0$, making the entire term $0$.
> $$
> \begin{align}
> \binom{r}{n}&=\frac{(r)(r-1)\dots(r-n+1)}{n!} \\
> &=\frac{(r)(r-1)\dots(0)\dots(r-n+1)}{n!} \\
> &=0
> \end{align}
> $$
> Another way to look at this is that there are $0$ ways of making $r>n$ selections from $n$ items, since there aren't enough items to choose from.
> Therefore, the highest $n\in \mathbb{Z}^{+}$ term in a binomial series for $(1+x)^{r}$ will always be $n=r$. So binomial series for $(1+x)^{2}$ stops at $n=r=2$., we've already seen.

## Proof that

`\begin{proof}`
Let's prove that the Maclaurin series of $\sin(x)$ equals it's Taylor series using [[6.2 - Taylor Series#^f9b03a]]. We will show that $\lim_{n\to\infty}{R_{n}(x)}=0$.

We know that the $n$th derivative of $f(x)=\sin(x)$ follows the repeating pattern
$$
\begin{align}
f(x)&=\sin(x) \\ 
f'(x)&=\cos(x) \\
f''(x)&=-\sin(x) \\
f'''(x)&=-\cos(x) \\
f''''(x)& =\sin(x) \\
&\dots
\end{align}
$$
All of which will always evaluate to $\lvert{f^{(n)}(x)}\rvert\leq 1$. So we satisfy the hypothesis of Taylor's Theorem for $M=1$. We also know that $a=1$ because it's a Maclaurin Series.
$$
\lvert{R_{n}(x)}\rvert \leq \frac{\lvert{x}\rvert^{n+1}}{(n+1)!}
$$
We can take the limit of both sides,
$$
\begin{align}
\lvert{R_{n}(x)}\rvert &\leq \frac{\lvert{x}\rvert^{n+1}}{(n+1)!} \\
\lim_{n\to\infty}\lvert{R_{n}(x)}\rvert &\leq \lim_{n\to\infty}\frac{\lvert{x}\rvert \lvert{x}\rvert^{n}}{(n+1)(n)!} \\
&\leq \lim_{n\to\infty}{\frac{\lvert{x}\rvert}{n+1}} \frac{\lvert{x}\rvert^{n}}{n!}   \\
&\leq \lim_{n\to\infty}{\frac{\lvert{x}\rvert}{n+1}} \cdot \lim_{n\to\infty}{\frac{\lvert{x}\rvert^{n}}{n!}}
\end{align}
$$
We know that $\lim_{n\to\infty}{\frac{\lvert{x}\rvert^{n}}{n!}}=0$ because $n!$ increases faster than $\lvert{x}\rvert^{n}$. We also know $\frac{\lim_{n\to\infty}{\lvert{x}\rvert}}{n+1}=0$ because there's no $n$ term in the numerator. So,

$$
\lim_{n\to\infty}\lvert{R_{n}(x)}\rvert \leq 0\\
$$
The absolute value cannot produce negative numbers, so
$$
\lim_{n\to\infty}\lvert{R_{n}(x)}\rvert = 0\\
$$
Therefore, $f(x)=\sin(x)$ must equal it's Taylor series.
`\end{proof}`
