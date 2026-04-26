# Derivation of RC Oscillator Period from First Principles

  

## Assumptions

  

We accept only the following as true:

  

- Kirchhoff's voltage law (KVL)

- Capacitor equation: $I = C \frac{dV}{dt}$

- The op-amp output saturates to $+V_s$ or $-V_s$

- The resistor divider formula

  

We set $V_\text{ref} = 0$ throughout. It only shifts all voltages by a constant and does not affect the period.

  

---

  

## Step 1: What is $V_+$ at any moment?

  

$V_+$ is connected to two equal resistors $R_1 = R_2$. One goes to $V_\text{out}$, one goes to ground ($V_\text{ref} = 0$). No current flows into the op-amp input (high impedance). By the resistor divider formula:

  

$$V_+ = \frac{V_\text{out}}{2}$$

  

---

  

## Step 2: When does the circuit flip?

  

The circuit flips when $V_-$ crosses $V_+$.

  

Say the output is currently at $+V_s$. Then the threshold is:

  

$$V_+^\text{high} = \frac{V_s}{2}$$

  

---

  

## Step 3: What is $V_-$ at the start of this half-cycle?

  

This half-cycle began when the *previous* flip happened.

  

During the previous half-cycle, the output was at $-V_s$. The threshold during that half-cycle was:

  

$$V_+^\text{low} = \frac{-V_s}{2}$$

  

The previous flip happened when $V_-$ reached that threshold. So at the moment of the flip:

  

$$V_- = -\frac{V_s}{2}$$

  

The output then snapped to $+V_s$. But a capacitor's voltage cannot change instantaneously. So right after the flip:

  

$$V_-(t=0) = -\frac{V_s}{2}$$

  

> **This is the key point.** $V_-$ starts at $-V_s/2$, not at $-V_s$ or $0$. It equals $-V_s/2$ because:

> 1. The flip happens when $V_- = V_+$

> 2. $V_+$ was $\frac{V_\text{out}}{2} = \frac{-V_s}{2}$ during the previous half-cycle

> 3. The capacitor voltage can't jump

  

---

  

## Step 4: Write the charging equation

  

The capacitor charges through $R$ toward $V_\text{out}$. By KVL around the loop:

  

$$V_\text{out} = IR + V_\text{cap}$$

  

Since $I = C \frac{dV_\text{cap}}{dt}$:

  

$$V_\text{out} = RC\frac{dV_\text{cap}}{dt} + V_\text{cap}$$

  

This is a first-order linear ODE with constant $V_\text{out} = +V_s$. The general solution is:

  

$$V_\text{cap}(t) = V_s + \left(V_\text{cap}(0) - V_s\right) e^{-t/RC}$$

  

Substitute $V_\text{cap}(0) = -\frac{V_s}{2}$:
$$
$
$$
  

$$V_\text{cap}(t) = V_s + \left(-\frac{V_s}{2} - V_s\right) e^{-t/RC}$$

  

$$\boxed{V_-(t) = V_s - \frac{3V_s}{2}\, e^{-t/RC}}$$

  
$$

$$
---

  

## Step 5: Solve for when $V_- = V_+$

  

Set $V_-(t) = V_+^\text{high} = \frac{V_s}{2}$:

  

$$\frac{V_s}{2} = V_s - \frac{3V_s}{2}\, e^{-t/RC}$$

  

Rearrange:

  

$$\frac{3V_s}{2}\, e^{-t/RC} = V_s - \frac{V_s}{2} = \frac{V_s}{2}$$

  

Divide both sides by $\frac{3V_s}{2}$:

  

$$e^{-t/RC} = \frac{1}{3}$$

  

Take the natural log:

  

$$-\frac{t}{RC} = \ln\frac{1}{3} = -\ln 3$$

  

$$\boxed{t_\text{half} = RC \ln 3}$$

  

---

  

## Step 6: Full period

  

The discharge half-cycle is symmetric (same $R$, same $C$, same threshold distances, just flipped in sign). So:

  

$$\boxed{T = 2\,RC \ln 3}$$

  

---

  

## Where does the 3 come from?

  

| Quantity | Value | Why |

|---|---|---|

| Capacitor starts at | $-\frac{V_s}{2}$ | Previous threshold $= \frac{V_\text{out}}{2} = \frac{-V_s}{2}$ |

| Capacitor charges toward | $+V_s$ | The output rail |

| Total distance to target | $V_s - \left(-\frac{V_s}{2}\right) = \frac{3V_s}{2}$ | |

| Distance to threshold | $\frac{V_s}{2} - \left(-\frac{V_s}{2}\right) = V_s$ | |

| Fraction of total distance | $\frac{V_s}{3V_s/2} = \frac{2}{3}$ | |

  

The capacitor must cover $\frac{2}{3}$ of the total exponential swing. Solving $1 - e^{-t/\tau} = \frac{2}{3}$ gives $e^{-t/\tau} = \frac{1}{3}$, hence $\ln 3$.

  

If the feedback resistors were unequal, the divider ratio would change, the thresholds would shift, and you'd get a different number inside the logarithm.


$$
\begin{align}
\frac{V_S }{2}+V_\text{ref} & = V_\text{ref}-\frac{V_S}{2}+ \frac{3V_S}{2}(1-e^{(-t/ \tau)}) \\[0.5em]


\frac{2}{3} & = 1-e^{-t/\tau} \\[0.5em]

\frac{1}{3} & = e^{-t/\tau} \\[0.5em]

t & = -\tau\ln{\left(\frac{1}{3}\right)} \\
\end{align}
$$