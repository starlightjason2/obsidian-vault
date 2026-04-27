# Lagrangian Mechanics

Lagrangian mechanics is a reformulation of Newtonian mechanics using the Euler-Lagrange equation. It allows for solving complicated systems in beautiful, simple ways.

> [!def] Lagrangian
> In mechanics, the [[3.8 - Calculus of Variation#^lagrangian]] is the [[1.5 - Work and Energy#^kinetic-energy]] of the system minus the [[1.5 - Work and Energy#^potential-energy]] of the system.
>
> $$\mathcal{L}=\text{KE}-\text{PE}$$
>

^lagrangian-2

> [!def] Generalized Momentum
> The [[3.5 - Derivatives#^partial-derivative]] of the [[#^lagrangian-2]] $\mathcal{L}(q,\dot{q}_{i},t)$ with respect to $\dot{q}_{i}$ is called the **generalized [[1.6 - Linear Momentum and Collisions#^momentum]].**
> $$\frac{\partial \mathcal{L}}{\partial \dot{q}_{i}}=p_{i}$$

^generalized-momentum

> [!def] Generalized Force
> The [[3.5 - Derivatives#^partial-derivative]] of the [[#^lagrangian-2]] $\mathcal{L}(q,\dot{q}_{i},t)$ with respect to coordinate $q_{i}$ is called the **generalized [[1.3 - Newton's Laws#^force]].**
> $$\frac{\partial \mathcal{L}}{\partial q_{i}}=F_{i}$$

^generalized-force

> [!thm] Hamilton's Principle
> The motion of a particle with position $\mathbf{q}=\left<q_{1},\dots q_{k}\right>$ in any generalized coordinates will always minimize the action integral of the [[#^lagrangian-2]].
>
> For each $i$th coordinate, there will be an [[3.8 - Calculus of Variation#^euler-lagrange-equation]] using the [[#^generalized-momentum]] $\mathcal{L}_{q_{i}}=F_{i}$ and [[#^generalized-momentum]] $\mathcal{L}_{\dot{q}_{i}}=p_{i}$.
> $$F_{i}=\frac{d}{dt}\,p_{i}$$

^hamiltons-principle

## Deriving Newton's Laws

Consider a particle freely moving with $\text{KE}=\frac{1}{2}m\,\dot{x}^{2}, \ \text{PE}=U(x)$. Then, we can write a Lagrangian $\mathcal{L}=\frac{1}{2}m\,\dot{x}^{2}-U(x)$. Then, and $F_{x}=\mathcal{L}_{q}=-\frac{dU}{dx}$ and $p=\mathcal{L}_{\dot{q}}=m\,\dot{x}$. Then, by [[#^hamiltons-principle]], we can say $F=\dot{p}$, or

$$
-\frac{dU}{dx}=\,m\ddot{x}
$$

Which is identical to the equations for [[1.3 - Newton's Laws#^newtons-second-law]] and [[1.5 - Work and Energy#^potential-energy]].

### Speed in Curvilinear Coordinates

> [!thm] Speed in Cylindrical Coordinates
> In spherical coordinates, the speed $\lVert{\mathbf{v}}\rVert$ of a particle is
> $$\mathbf{v}^{2}=\dot{r}^{2}+r^{2}\,\dot{\phi}^{2}+\dot{z}^{2}$$

^speed-in-cylindrical-coordinates

`\begin{proof}`@[[#^speed-in-cylindrical-coordinates]]
Let the position be $\mathbf{r}=(r\cos\theta)\,\hat{\boldsymbol{x}}+(r\sin\theta)\,\hat{\boldsymbol{y}}+z\,\hat{\boldsymbol{z}}$ and the velocity be $\mathbf{v}=\dot{\mathbf{r}}$.

$$
\begin{align}
\mathbf{v}=\frac{d\mathbf{r}}{dt}&=\begin{bmatrix}
-r\sin\theta\,\dot{\theta}+\dot{r}\cos\theta \\
r\cos\theta\,\dot{\theta}+\dot{r}\sin\theta \\
\dot{z}
\end{bmatrix}
\end{align}
$$

$$
\begin{align}
\mathbf{v}^{2}= \ & \ r^{2}\,\dot{\theta}^{2}\sin^{2}\theta\cancel{-2\,r\,\dot{r}\,\dot{\phi}\cos\phi\sin\phi}+\dot{r}^{2}\cos^{2}\phi \\
+& \ r^{2}\,\dot{\phi}^{2}\cos^{2}\phi\cancel{+2\,r\,\dot{r}\,\dot{\phi}\cos\phi\sin\phi}+\dot{r}^{2}\sin^{2}\phi \\
+& \ \dot{z}^{2} \\
\end{align}
$$
$$
\begin{align}
\mathbf{v}^{2}&=r^{2}\,\dot{\phi}^{2}\cancel{(\sin^{2}\phi+\cos^{2}\phi)}+\dot{r}^{2}\cancel{(\sin^{2}\phi+\cos^{2}\phi)}+\dot{z}^{2} \\
&=r^{2}+\dot{r}^{2}\,\dot{\phi}^{2}+\dot{z}^{2}
\end{align}
$$
`\end{proof}`

> [!thm] Speed in Spherical Coordinates
> In spherical coordinates, the speed $\lVert{\mathbf{v}}\rVert$ of a particle is
> $$\mathbf{v}^{2}= \dot{r}^{2}+r^{2} \dot{\phi}^{2}+r^{2}\dot{\theta}^{2} \sin^{2}\phi$$

^speed-in-spherical-coordinates

`\begin{proof}`@[[#^speed-in-spherical-coordinates]]
Let the position be $\mathbf{r}=(r\cos \theta \sin \phi)\,\hat{\boldsymbol{x}}+(r\sin \theta \sin \phi)\,\hat{\boldsymbol{y}}+(r\cos \phi)\,\hat{\boldsymbol{z}}$ and the velocity be $\mathbf{v}=\dot{\mathbf{r}}$.

$$
\begin{align}
\mathbf{v}=\frac{d\mathbf{r}}{dt}&=\begin{bmatrix}
\dot{r}\cos \theta \sin \phi-r \dot{\theta}\sin \theta \sin \phi+r \dot{\phi}\cos \theta \cos \phi \\
\dot{r}\sin \theta \sin \phi+r \dot{\theta}\cos \theta \sin \phi+r \dot{\phi}\sin \theta \cos \phi) \\
\dot{r}\cos \phi-r \dot{\phi}\sin \phi
\end{bmatrix}
\end{align}
$$

$$
\begin{align}
\mathbf{v}^{2}= \ &\dot{r}^{2}\cos^{2} \theta \sin^{2} \phi +r^{2}\dot{\theta}^{2}\sin^{2}\theta \sin^{2}\phi+\dot{r}^{2}\sin^{2} \theta \sin^{2} \phi \\
&\cancel{-2(\dot{r}\cos \theta \sin \phi\,r\,\dot{\theta}\sin \theta \sin \phi)} \cancel{-2(r\, \dot{\theta}\sin \theta \sin \phi\,r\, \dot{\phi}\cos \theta \cos \phi)} +2(\dot{r}\cos \theta \sin \phi\,r\, \dot{\phi}\cos \theta \cos \phi) \\
&+r^{2} \dot{\phi}^{2}\cos^{2} \theta \cos^{2} \phi+r^{2}\dot{\theta}^{2}\cos^{2}\theta \sin^{2}\phi +r^{2}\dot{\phi}^{2}\sin^{2}\theta \cos^{2}\phi\\
&\cancel{+2(\dot{r}\sin \theta \sin \phi\,r\, \dot{\theta}\cos \theta \sin \phi)} +2\,\dot{r}\sin \theta \sin \phi\,r\,\dot{\phi}\sin \theta \cos \phi +\cancel{2(r\,\dot{\theta}\cos \theta \sin \phi\,r\,\dot{\phi}\sin \theta \cos \phi)} \\
&+\dot{r}^{2}\cos^{2}\phi-2\,r\,\dot{r}\,\dot{\phi}\cos \phi \sin \phi+r^{2}\dot{\phi}^{2}\sin^{2}\phi
\\ \\
= \ &\dot{r}^{2}\cos^{2} \theta \sin^{2} \phi+r^{2}\dot{\theta}^{2} \sin^{2}\phi\cancel{(\sin^{2}\theta+\cos^{2}\theta)}\\
&+2\,\dot{r}\,r\,\dot{\phi}\cos^{2}\theta \sin\phi\cos \phi +2\,\dot{r}\dot{\phi}\,r\sin^{2} \theta \sin \phi\cos \phi-2\,r\,\dot{r}\,\dot{\phi}\cos \phi \sin \phi+r^{2}\dot{\phi}^{2}\sin^{2}\phi \\
&+r^{2} \dot{\phi}^{2}\cos^{2} \theta \cos^{2} \phi+\dot{r}^{2}\sin^{2} \theta \sin^{2} \phi \\
&+r^{2}\dot{\phi}^{2}\sin^{2}\theta \cos^{2}\phi +\dot{r}^{2}\cos^{2}\phi
\\\\
= \ &r^{2}\dot{\theta}^{2} \sin^{2}\phi+\dot{r}^{2}\sin^{2} \phi\cancel{(\cos^{2} \theta+\sin^{2} \phi)}+r^{2} \dot{\phi}^{2}\cos^{2} \phi\cancel{(\cos^{2} \theta+\sin^{2}\theta)}\\
&+2\,\dot{r}\,r\,\dot{\phi} \sin\phi\cos \phi \cancel{(\cos^{2}\theta+\sin^{2}\theta)}-2\,r\,\dot{r}\,\dot{\phi}\cos \phi \sin \phi \\
&+\dot{r}^{2}\cos^{2}\phi+r^{2}\dot{\phi}^{2}\sin^{2}\phi
 \\ \\
= \ &r^{2}\dot{\theta}^{2} \sin^{2}\phi+\dot{r}^{2}\sin^{2} \phi+\dot{r}^{2}\cos^{2}\phi+r^{2} \dot{\phi}^{2}\cos^{2} \phi+r^{2}\dot{\phi}^{2}\sin^{2}\phi\\
&\cancel{+2\,\dot{r}\,r\,\dot{\phi} \sin\phi\cos \phi}\cancel{-2\,r\,\dot{r}\,\dot{\phi}\cos \phi \sin \phi}
 \\ \\
= \ & r^{2}\dot{\theta}^{2} \sin^{2}\phi+\dot{r}^{2}\cancel{(\sin^{2} \phi+\cos^{2}\phi)}+r^{2} \dot{\phi}^{2}\cancel{(\cos^{2} \phi+\sin^{2}\phi)}
 \\ \\
= \ & \dot{r}^{2}+r^{2} \dot{\phi}^{2}+r^{2}\dot{\theta}^{2} \sin^{2}\phi

\end{align}

$$
`\end{proof}`

## Noether's Theorem

> [!thm] Noether's Theorem
> In any classical system with independent variables $\{q_{1},\dots,q_{k} \}$, if a [[#^lagrangian-2]] is **explicitly invariant** over any variable, it corresponds to a conserved quantity.

^noethers-theorem

> [!cor] Conservation of Energy
> By [[#^noethers-theorem]], if $\mathcal{L}(q,\dot{q})$ is explicitly invariant over time $t$, it results in [[1.5 - Work and Energy#^conservation-of-mechanical-energy]].
>

^conservation-of-energy

`\begin{proof}`@[[#^conservation-of-energy]]
$$
\begin{align}
\frac{\partial \mathcal{L}}{\partial q_{i}}&=\frac{d}{dt}\left( \frac{\partial \mathcal{L}}{\partial \dot{q}_{i}} \right)=\frac{d}{dt}\,p_{i}= \dot{p}_{i}
\end{align}
$$

By the [[3.5 - Derivatives#^generalized-chain-rule]],

$$
\begin{align}
\frac{\partial \mathcal{L_{i}}}{\partial t}&=\frac{\partial \mathcal{L}}{\partial q_{i}}\frac{\partial q_{i}}{\partial t}+\frac{\partial \mathcal{L}}{\partial \dot{q}_{i}}\frac{\partial \dot{q}_{i}}{\partial t}  \\
&=\dot{p}_{i}\,\dot{q}_{i}+p_{i}\,\ddot{q}_{i}
\end{align}
$$
`\end{proof}`

> [!cor] Conservation of Momentum
> By [[#^noethers-theorem]], if $\mathcal{L}(\dot{q}),t$ is explicitly invariant over $q$, it results in [[1.6 - Linear Momentum and Collisions#^conservation-of-momentum]]

> [!cor] Conservation of Angular Momentum
> By [[#^noethers-theorem]], if $\mathcal{L}(q,t)$ is explicitly invariant over $\dot{q}$, it results in [[1.8 - Angular Momentum#^conservation-of-angular-momentum]].
