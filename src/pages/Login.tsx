import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { loginEmail, signupEmail, signInDemo } from "../firebase/authHelpers";

/* ============================================================
   BLOB LOGIN PAGE
   
   Recreation of the viral Dribbble "Blob Login" design
   
   Animation States:
   1. IDLE: Blobs spread apart with random floating animations
      - Purple: Tilted diamond shape, top-left
      - Black: Tall rectangle, top-center  
      - Orange: Small ellipse, far left
      - Yellow: Pac-Man shape, bottom-right
   
   2. EMAIL FOCUS: Blobs huddle together
      - All eyes track the text cursor as user types
      - Shapes morph into compact group
   
   3. PASSWORD FOCUS: Blobs huddle, close eyes
      - Orange: Curved line eyes (^_^)
      - Purple: < < arrow eyes looking away
      - Black: Eyes look up
      - Yellow: Wavy concerned mouth
   ============================================================ */

type InteractionState = "idle" | "email" | "password";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Interaction state for blob animations
  const [interactionState, setInteractionState] = useState<InteractionState>("idle");
  
  // Eye tracking position (0 to 1)
  const [eyeTrackX, setEyeTrackX] = useState(0);

  // Update eye tracking based on email length
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    const normalized = Math.min(value.length / 25, 1);
    setEyeTrackX(normalized);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email.trim()) { setError("Please enter your email"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }

    setLoading(true);
    try {
      await loginEmail(email, password);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInDemo();
      navigate("/dashboard");
    } catch {
      setError("Demo sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] bg-white rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row">
        
        {/* LEFT SIDE - BLOB STAGE */}
        <div className="lg:w-[45%] bg-[#FAF8F5] p-6 lg:p-8 flex items-center justify-center min-h-[300px] lg:min-h-[520px] relative overflow-hidden">
          <BlobScene
            state={interactionState}
            eyeTrackX={eyeTrackX}
            showPassword={showPassword}
          />
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="lg:w-[55%] p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-[320px] mx-auto w-full">
            
            {/* Logo */}
            <div className="mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L12 12M12 12L22 12M12 12L2 12M12 12L12 22" 
                      stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>

            <h1 className="text-[26px] font-bold text-[#1A1A1A] mb-2 tracking-tight">
              Welcome back!
            </h1>
            <p className="text-[#888] text-[14px] mb-8">
              Please enter your details.
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[12px] text-[#888] mb-2 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setInteractionState("email")}
                  onBlur={() => setInteractionState("idle")}
                  className="w-full h-10 px-0 text-[15px] text-[#1A1A1A] bg-transparent border-b border-[#E0E0E0] focus:border-[#1A1A1A] focus:outline-none transition-colors"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[12px] text-[#888] mb-2 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setInteractionState("password")}
                    onBlur={() => setInteractionState("idle")}
                    className="w-full h-10 px-0 pr-10 text-[15px] text-[#1A1A1A] bg-transparent border-b border-[#E0E0E0] focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[#AAA] hover:text-[#1A1A1A] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-[12px] text-[#888]">Remember for 30 days</span>
                </label>
                <button type="button" className="text-[12px] text-[#1A1A1A] font-medium hover:underline">
                  Forgot password
                </button>
              </div>

              {/* Buttons */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 mt-2 bg-[#1A1A1A] text-white text-[14px] font-medium rounded-full hover:bg-[#333] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Log in"
                )}
              </button>

              <button
                type="button"
                onClick={handleDemo}
                disabled={loading}
                className="w-full h-12 bg-white border border-[#E5E5E5] text-[#1A1A1A] text-[14px] font-medium rounded-full hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Log in with Google
              </button>
            </form>

            <p className="text-center mt-8 text-[13px] text-[#888]">
              Don't have an account?{" "}
              <button className="text-[#1A1A1A] font-medium hover:underline">Sign up</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BLOB SCENE COMPONENT
   Manages all 4 blob characters and their state-based animations
   ============================================================ */

interface BlobSceneProps {
  state: InteractionState;
  eyeTrackX: number;
  showPassword: boolean;
}

function BlobScene({ state, eyeTrackX, showPassword }: BlobSceneProps) {
  const isIdle = state === "idle";
  const isEmail = state === "email";
  const isPassword = state === "password";

  // Spring transition for smooth morphing
  const springTransition = { type: "spring", stiffness: 180, damping: 20 };
  const fastSpring = { type: "spring", stiffness: 300, damping: 25 };

  // Floating animation for idle state
  const floatAnimation = {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  };

  // Pupil offset calculation
  const pupilX = eyeTrackX * 5;

  return (
    <motion.svg
      viewBox="0 0 320 280"
      className="w-full max-w-[300px] lg:max-w-[320px]"
      style={{ overflow: "visible" }}
    >
      {/* ================================================================
          PURPLE BLOB - Tall rectangle / tilted diamond
          IDLE: Tilted ~45° diamond, top-left area
          ACTIVE: Straightens, moves to back-left of huddle
          ================================================================ */}
      <motion.g
        animate={isIdle ? {
          x: 60,
          y: 20,
          rotate: -35,
          ...floatAnimation
        } : {
          x: 65,
          y: 15,
          rotate: 0,
        }}
        transition={springTransition}
      >
        {/* Body */}
        <motion.rect
          x="0"
          y="0"
          rx="8"
          ry="8"
          fill="#5B4CFA"
          animate={isIdle ? {
            width: 70,
            height: 85,
          } : {
            width: 65,
            height: 130,
          }}
          transition={springTransition}
        />
        
        {/* Eyes */}
        <motion.g
          animate={isIdle ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* When password: < < shaped eyes looking away */}
          {isPassword ? (
            <>
              <motion.path
                d="M 22 50 L 15 56 L 22 62"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                d="M 47 50 L 40 56 L 47 62"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
            </>
          ) : (
            <>
              {/* Normal eyes */}
              <ellipse cx="20" cy="55" rx="5" ry="6" fill="white" />
              <ellipse cx="45" cy="55" rx="5" ry="6" fill="white" />
              <motion.g
                animate={{ x: pupilX }}
                transition={fastSpring}
              >
                <circle cx="20" cy="56" r="2.5" fill="#1A1A1A" />
                <circle cx="45" cy="56" r="2.5" fill="#1A1A1A" />
              </motion.g>
            </>
          )}
        </motion.g>

        {/* Idle state eyes (on diamond) */}
        <motion.g
          animate={isIdle ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <circle cx="25" cy="35" r="4" fill="white" />
          <circle cx="45" cy="35" r="4" fill="white" />
          <circle cx="25" cy="36" r="2" fill="#1A1A1A" />
          <circle cx="45" cy="36" r="2" fill="#1A1A1A" />
        </motion.g>
      </motion.g>

      {/* ================================================================
          BLACK BLOB - Tall pill shape
          IDLE: Standing tall at top
          ACTIVE: Moves behind orange blob
          ================================================================ */}
      <motion.g
        animate={isIdle ? {
          x: 170,
          y: 0,
          ...floatAnimation
        } : {
          x: 125,
          y: 25,
        }}
        transition={{ ...springTransition, delay: 0.02 }}
      >
        {/* Body */}
        <motion.rect
          rx="18"
          ry="18"
          fill="#1A1A1A"
          animate={isIdle ? {
            x: 0,
            y: 0,
            width: 40,
            height: 100,
          } : {
            x: 0,
            y: 0,
            width: 45,
            height: 120,
          }}
          transition={springTransition}
        />
        
        {/* Eyes */}
        <g>
          <motion.ellipse
            fill="white"
            animate={isIdle ? {
              cx: 12, cy: 30, rx: 5, ry: 6
            } : {
              cx: 14, cy: 50, rx: 6, ry: isPassword ? 2 : 8
            }}
            transition={springTransition}
          />
          <motion.ellipse
            fill="white"
            animate={isIdle ? {
              cx: 28, cy: 30, rx: 5, ry: 6
            } : {
              cx: 32, cy: 50, rx: 6, ry: isPassword ? 2 : 8
            }}
            transition={springTransition}
          />
          
          {/* Pupils (hidden when password) */}
          <motion.g
            animate={{ 
              x: isEmail ? pupilX : 0,
              opacity: isPassword ? 0 : 1,
              y: isPassword ? -10 : 0 
            }}
            transition={fastSpring}
          >
            <motion.circle
              fill="#1A1A1A"
              animate={isIdle ? {
                cx: 12, cy: 32, r: 2.5
              } : {
                cx: 14, cy: 52, r: 3
              }}
              transition={springTransition}
            />
            <motion.circle
              fill="#1A1A1A"
              animate={isIdle ? {
                cx: 28, cy: 32, r: 2.5
              } : {
                cx: 32, cy: 52, r: 3
              }}
              transition={springTransition}
            />
          </motion.g>
        </g>
      </motion.g>

      {/* ================================================================
          ORANGE BLOB - Semi-circle dome (protagonist)
          IDLE: Small vertical ellipse on far left
          ACTIVE: Large dome in front
          ================================================================ */}
      <motion.g
        animate={isIdle ? {
          x: 5,
          y: 130,
          scale: 1,
          ...floatAnimation
        } : {
          x: 30,
          y: 90,
          scale: 1,
        }}
        transition={{ ...springTransition, delay: 0.04 }}
      >
        {/* Body */}
        <motion.ellipse
          fill="#FF6B2C"
          animate={isIdle ? {
            cx: 15,
            cy: 40,
            rx: 18,
            ry: 45,
          } : {
            cx: 75,
            cy: 85,
            rx: 85,
            ry: 75,
          }}
          transition={springTransition}
        />
        
        {/* Eyes - Different for each state */}
        <motion.g
          animate={isIdle ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isPassword ? (
            /* Closed eyes - curved happy lines ^_^ */
            <>
              <motion.path
                d="M 45 75 Q 55 65, 65 75"
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                d="M 85 75 Q 95 65, 105 75"
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              />
              {/* Small curved mouth when hiding */}
              <motion.path
                d="M 65 105 Q 75 100, 85 105"
                fill="none"
                stroke="#D4501E"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </>
          ) : (
            /* Normal open eyes with tracking pupils */
            <>
              <circle cx="55" cy="75" r="10" fill="white" />
              <circle cx="100" cy="75" r="10" fill="white" />
              <motion.g
                animate={{ x: pupilX * 1.2 }}
                transition={fastSpring}
              >
                <circle cx="55" cy="77" r="4.5" fill="#1A1A1A" />
                <circle cx="100" cy="77" r="4.5" fill="#1A1A1A" />
              </motion.g>
              {/* Happy smile */}
              <path
                d="M 65 105 Q 77 115, 90 105"
                fill="none"
                stroke="#D4501E"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </>
          )}
        </motion.g>

        {/* Idle state eyes (small on ellipse) */}
        <motion.g
          animate={isIdle ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <circle cx="10" cy="30" r="3" fill="#1A1A1A" />
          <circle cx="22" cy="30" r="3" fill="#1A1A1A" />
        </motion.g>
      </motion.g>

      {/* ================================================================
          YELLOW BLOB - Pac-Man / Bird shape
          IDLE: Pac-Man shape on right side
          ACTIVE: Rounded blob next to orange
          ================================================================ */}
      <motion.g
        animate={isIdle ? {
          x: 200,
          y: 150,
          ...floatAnimation
        } : {
          x: 170,
          y: 100,
        }}
        transition={{ ...springTransition, delay: 0.06 }}
      >
        {/* Body - Pac-Man when idle, rounded when active */}
        <motion.path
          fill="#FFD93D"
          animate={isIdle ? {
            d: "M 60 40 A 35 35 0 1 1 60 39.99 L 35 40 Z" // Pac-man facing right
          } : {
            d: "M 0 75 Q 0 0, 40 5 Q 80 10, 80 75 Q 80 130, 40 130 Q 0 130, 0 75 Z" // Rounded blob
          }}
          transition={springTransition}
        />
        
        {/* Beak/Mouth line - visible when idle */}
        <motion.line
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={isIdle ? {
            x1: 45, y1: 40,
            x2: 75, y2: 35,
            opacity: 1
          } : {
            x1: 50, y1: 90,
            x2: 80, y2: 85,
            opacity: isPassword ? 1 : 0
          }}
          transition={springTransition}
        />

        {/* Wavy mouth when password (concerned look) */}
        {isPassword && !isIdle && (
          <motion.path
            d="M 25 95 Q 35 100, 45 92 Q 55 85, 65 95"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />
        )}
        
        {/* Eyes */}
        <motion.g>
          {/* Idle small dots */}
          <motion.circle
            fill="#1A1A1A"
            animate={isIdle ? {
              cx: 30, cy: 30, r: 4, opacity: 1
            } : {
              cx: 25, cy: 50, r: 5, opacity: isPassword ? 0.3 : 1
            }}
            transition={springTransition}
          />
          <motion.circle
            fill="#1A1A1A"
            animate={isIdle ? {
              cx: 45, cy: 28, r: 4, opacity: 1
            } : {
              cx: 50, cy: 48, r: 5, opacity: isPassword ? 0.3 : 1
            }}
            transition={springTransition}
          />
          
          {/* Eye tracking for email state */}
          {isEmail && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: pupilX * 0.8 }}
              transition={fastSpring}
            >
              {/* Pupils move inside eyes */}
            </motion.g>
          )}
        </motion.g>
      </motion.g>

      {/* ================================================================
          DECORATIVE ELEMENTS
          Small floating shapes for visual interest
          ================================================================ */}
      <motion.circle
        cx="280"
        cy="30"
        r="4"
        fill="#5B4CFA"
        animate={isIdle ? { 
          y: [0, -5, 0],
          opacity: 0.6
        } : { 
          y: 0,
          opacity: 0 
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        cx="20"
        cy="80"
        r="3"
        fill="#FF6B2C"
        animate={isIdle ? { 
          y: [0, -4, 0],
          opacity: 0.5
        } : { 
          y: 0,
          opacity: 0 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.svg>
  );
}
