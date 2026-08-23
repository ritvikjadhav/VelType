/* =========================================================
   VELTYPE — DASHBOARD
   Connected to Typing Test + Learn localStorage
   ========================================================= */

(() => {
    "use strict";

    /* =========================================================
       STORAGE
       ========================================================= */

    const STORAGE_KEYS = {
        tests: "veltypeTests",
        lessons: "veltypeLessonProgress",
        progress: "veltypeProgress",
        exercises: "veltypeExercises"
    };

    const TOTAL_LESSONS = 24;

    const $ = selector =>
        document.querySelector(selector);


    /* =========================================================
       STORAGE HELPERS
       ========================================================= */

    function getData(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);

            if (!value) {
                return fallback;
            }

            const data = JSON.parse(value);

            return data ?? fallback;

        } catch (error) {
            console.error(
                `VelType could not read ${key}:`,
                error
            );

            return fallback;
        }
    }


    /* =========================================================
       TEST DATA
       ========================================================= */

    function getTests() {
        const tests = getData(
            STORAGE_KEYS.tests,
            []
        );

        return Array.isArray(tests)
            ? tests
            : [];
    }


    /* =========================================================
       LESSON DATA
       =========================================================

       learn.js uses:

       veltypeLessonProgress

       Example:

       {
           "1": {
               completed: true
           },
           "2": {
               completed: false
           }
       }
    */

    function getLessonProgress() {
        const progress = getData(
            STORAGE_KEYS.lessons,
            {}
        );

        return progress &&
            typeof progress === "object" &&
            !Array.isArray(progress)
            ? progress
            : {};
    }


    /* =========================================================
       BASIC UI
       ========================================================= */

    function setText(selector, value) {
        const element = $(selector);

        if (element) {
            element.textContent = value;
        }
    }


    function setWidth(selector, percent) {
        const element = $(selector);

        if (!element) {
            return;
        }

        const value = Math.max(
            0,
            Math.min(
                100,
                Number(percent) || 0
            )
        );

        requestAnimationFrame(() => {
            element.style.width = `${value}%`;
        });
    }


    /* =========================================================
       NUMBER ANIMATION
       ========================================================= */

    function animateNumber(
        selector,
        target,
        suffix = ""
    ) {
        const element = $(selector);

        if (!element) {
            return;
        }

        const end = Number(target) || 0;

        const duration = 500;

        const startTime =
            performance.now();

        function update(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const value =
                Math.round(
                    end * eased
                );

            element.textContent =
                `${value}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(
                    update
                );
            }
        }

        requestAnimationFrame(update);
    }


    /* =========================================================
       TEST STATISTICS
       ========================================================= */

    function getTestStats() {

        const tests = getTests();

        if (!tests.length) {
            return {
                count: 0,
                bestWpm: 0,
                averageWpm: 0,
                bestAccuracy: 0,
                averageAccuracy: 0
            };
        }

        const wpmValues =
            tests.map(test =>
                Number(test.wpm) || 0
            );

        const accuracyValues =
            tests.map(test =>
                Number(test.accuracy) || 0
            );

        const averageWpm =
            wpmValues.length
                ? Math.round(
                    wpmValues.reduce(
                        (sum, value) =>
                            sum + value,
                        0
                    ) /
                    wpmValues.length
                )
                : 0;

        const averageAccuracy =
            accuracyValues.length
                ? Math.round(
                    accuracyValues.reduce(
                        (sum, value) =>
                            sum + value,
                        0
                    ) /
                    accuracyValues.length
                )
                : 0;

        return {
            count: tests.length,

            bestWpm:
                Math.max(...wpmValues),

            averageWpm,

            bestAccuracy:
                Math.max(...accuracyValues),

            averageAccuracy
        };
    }


    /* =========================================================
       LESSON HELPERS
       ========================================================= */

    function isLessonCompleted(
        lessonNumber,
        progress
    ) {
        const lesson =
            progress[String(lessonNumber)];

        return Boolean(
            lesson &&
            lesson.completed === true
        );
    }


    function getCompletedLessons() {

        const progress =
            getLessonProgress();

        let completed = 0;

        for (
            let i = 1;
            i <= TOTAL_LESSONS;
            i++
        ) {
            if (
                isLessonCompleted(
                    i,
                    progress
                )
            ) {
                completed++;
            }
        }

        return completed;
    }


    /* =========================================================
       LESSON PROGRESS
       =========================================================

       The current learn.js code mainly
       stores completed: true/false.

       This also supports progress values
       if your lesson page later adds them.
    */

    function getLessonPercent(
        lessonNumber,
        progress
    ) {
        const lesson =
            progress[String(lessonNumber)];

        if (!lesson) {
            return 0;
        }

        if (
            lesson.completed === true ||
            lesson.status === "completed"
        ) {
            return 100;
        }

        let value =
            lesson.progress ??
            lesson.percent ??
            lesson.percentage ??
            lesson.completion ??
            0;

        if (typeof value === "string") {
            value =
                value.replace("%", "");
        }

        value = Number(value);

        if (
            value > 0 &&
            value <= 1
        ) {
            value *= 100;
        }

        if (!Number.isFinite(value)) {
            return 0;
        }

        return Math.max(
            0,
            Math.min(
                100,
                Math.round(value)
            )
        );
    }


    /* =========================================================
       OVERALL LESSON PROGRESS
       ========================================================= */

    function getAcademyProgress() {

        const progress =
            getLessonProgress();

        let totalProgress = 0;

        for (
            let i = 1;
            i <= TOTAL_LESSONS;
            i++
        ) {
            totalProgress +=
                getLessonPercent(
                    i,
                    progress
                );
        }

        return Math.round(
            totalProgress /
            TOTAL_LESSONS
        );
    }


    /* =========================================================
       CURRENT LESSON
       ========================================================= */

    function getCurrentLesson() {

        const progress =
            getLessonProgress();

        for (
            let i = 1;
            i <= TOTAL_LESSONS;
            i++
        ) {

            const percent =
                getLessonPercent(
                    i,
                    progress
                );

            if (percent < 100) {
                return {
                    number: i,
                    progress: percent
                };
            }
        }

        return {
            number: TOTAL_LESSONS,
            progress: 100
        };
    }


    /* =========================================================
       ACADEMY LEVEL
       ========================================================= */

    function getAcademyLevel(
        percent
    ) {

        if (percent >= 90) {
            return "Advanced";
        }

        if (percent >= 60) {
            return "Intermediate";
        }

        if (percent >= 30) {
            return "Developing";
        }

        return "Foundation";
    }


    /* =========================================================
       OVERVIEW STATS
       ========================================================= */

    function updateOverview() {

        const stats =
            getTestStats();

        animateNumber(
            "#bestWpm",
            stats.bestWpm
        );

        animateNumber(
            "#bestAccuracy",
            stats.bestAccuracy,
            "%"
        );

        animateNumber(
            "#testsCompleted",
            stats.count
        );

        /*
         * This requires dashboard.html
         * to have:
         *
         * id="averageWpm"
         */

        animateNumber(
            "#averageWpm",
            stats.averageWpm
        );
    }


    /* =========================================================
       CONTINUE LEARNING
       ========================================================= */

    function updateAcademy() {

        const completed =
            getCompletedLessons();

        const percent =
            getAcademyProgress();

        const current =
            getCurrentLesson();

        /* Overall percentage */

        setText(
            "#academyPercent",
            `${percent}%`
        );


        /* Academy level */

        setText(
            "#academyLevel",
            getAcademyLevel(percent)
        );


        /* Continue learning text */

        if (
            current.progress > 0 &&
            current.progress < 100
        ) {

            setText(
                "#academyProgressText",
                `Lesson ${String(current.number).padStart(2, "0")} is ${current.progress}% complete.`
            );

        } else if (
            completed >= TOTAL_LESSONS
        ) {

            setText(
                "#academyProgressText",
                "All 24 lessons completed. Excellent work."
            );

        } else {

            setText(
                "#academyProgressText",
                `Continue with Lesson ${String(current.number).padStart(2, "0")} to build your typing skills.`
            );
        }


        /* Progress bar */

        setWidth(
            "#academyProgressBar",
            percent
        );


        /* Progress ring */

        const ring =
            $(".academy-ring");

        if (ring) {

            requestAnimationFrame(() => {

                ring.style.background = `
                    conic-gradient(
                        var(--ink) 0 ${percent}%,
                        var(--surface-alt) ${percent}% 100%
                    )
                `;

            });
        }


        /*
         * Optional lesson count
         * if the HTML contains it.
         */

        setText(
            "#dashboardLessonsCompleted",
            completed
        );
    }


    /* =========================================================
       TEST HISTORY
       ========================================================= */

    function getTestTimestamp(test) {

        if (!test) {
            return 0;
        }

        if (
            typeof test.timestamp ===
            "number"
        ) {
            return test.timestamp;
        }

        if (test.date) {

            const timestamp =
                new Date(
                    test.date
                ).getTime();

            return Number.isNaN(timestamp)
                ? 0
                : timestamp;
        }

        return 0;
    }


    function formatDate(test) {

        const timestamp =
            getTestTimestamp(test);

        if (!timestamp) {
            return "Recently";
        }

        return new Intl.DateTimeFormat(
            "en",
            {
                day: "numeric",
                month: "short"
            }
        ).format(
            new Date(timestamp)
        );
    }


    function updateTestHistory() {

        const container =
            $("#testHistory");

        if (!container) {
            return;
        }

        const tests =
            getTests();

        if (!tests.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-mark">⌨</div>

                    <h3>No tests yet</h3>

                    <p>
                        Complete your first typing test
                        and your results will appear here.
                    </p>

                    <a
                        href="test.html"
                        class="dashboard-button button-secondary"
                    >
                        Take a Test <span>→</span>
                    </a>
                </div>
            `;

            return;
        }


        const recent =
            [...tests]
                .sort(
                    (a, b) =>
                        getTestTimestamp(b) -
                        getTestTimestamp(a)
                )
                .slice(0, 6);


        container.innerHTML = `
            <div class="history-list">

                ${recent.map(test => {

                    const wpm =
                        Number(test.wpm) || 0;

                    const accuracy =
                        Number(test.accuracy) || 0;

                    const errors =
                        Number(test.errors) || 0;

                    const mode =
                        Number(test.mode) ||
                        Number(test.duration) ||
                        30;

                    return `
                        <div class="history-item">

                            <div class="history-main">

                                <strong>
                                    ${wpm} WPM
                                </strong>

                                <span>
                                    ${accuracy}% accuracy
                                </span>

                            </div>

                            <div class="history-details">

                                <span>
                                    ${errors} errors
                                </span>

                                <span>
                                    ${mode}s
                                </span>

                                <time>
                                    ${formatDate(test)}
                                </time>

                            </div>

                        </div>
                    `;

                }).join("")}

            </div>
        `;
    }


    /* =========================================================
       RESET
       ========================================================= */

    let resetType = null;


    function setupResetActions() {

        const resetExercises =
            $("#resetExercises");

        const resetProgress =
            $("#resetProgress");

        const cancelReset =
            $("#cancelReset");

        const confirmReset =
            $("#confirmReset");

        const modal =
            $("#resetModal");


        resetExercises?.addEventListener(
            "click",
            () => {

                resetType =
                    "exercises";

                openResetModal(
                    "Reset exercises?",
                    "Your saved exercise progress will be removed. Your typing test history will remain."
                );
            }
        );


        resetProgress?.addEventListener(
            "click",
            () => {

                resetType =
                    "progress";

                openResetModal(
                    "Reset your progress?",
                    "This will remove your saved lessons, tests and typing statistics."
                );
            }
        );


        cancelReset?.addEventListener(
            "click",
            closeResetModal
        );


        confirmReset?.addEventListener(
            "click",
            () => {

                if (
                    resetType ===
                    "exercises"
                ) {

                    localStorage.removeItem(
                        STORAGE_KEYS.exercises
                    );
                }


                if (
                    resetType ===
                    "progress"
                ) {

                    localStorage.removeItem(
                        STORAGE_KEYS.tests
                    );

                    localStorage.removeItem(
                        STORAGE_KEYS.lessons
                    );

                    localStorage.removeItem(
                        STORAGE_KEYS.progress
                    );

                    localStorage.removeItem(
                        STORAGE_KEYS.exercises
                    );
                }


                closeResetModal();

                render();
            }
        );


        modal
            ?.querySelector(
                ".reset-modal-backdrop"
            )
            ?.addEventListener(
                "click",
                closeResetModal
            );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {
                    closeResetModal();
                }
            }
        );
    }


    /* =========================================================
       RESET MODAL
       ========================================================= */

    function openResetModal(
        title,
        message
    ) {

        const modal =
            $("#resetModal");

        if (!modal) {
            return;
        }

        setText(
            "#resetModalTitle",
            title
        );

        setText(
            "#resetModalText",
            message
        );

        modal.hidden = false;

        document.body.style.overflow =
            "hidden";

        requestAnimationFrame(() => {

            modal.classList.add(
                "is-visible"
            );
        });
    }


    function closeResetModal() {

        const modal =
            $("#resetModal");

        if (!modal) {
            }

        modal.classList.remove(
            "is-visible"
        );

        setTimeout(() => {

            modal.hidden = true;

            document.body.style.overflow =
                "";

        }, 220);

        resetType = null;
    }


    /* =========================================================
       REVEAL ANIMATION
       ========================================================= */

    function revealDashboard() {

        const elements =
            document.querySelectorAll(
                ".dashboard-header, .stats-grid, .dashboard-card"
            );

        elements.forEach(
            (element, index) => {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(14px)";

                setTimeout(() => {

                    element.style.transition =
                        "opacity .55s ease, transform .55s cubic-bezier(.2,.7,.2,1)";

                    element.style.opacity =
                        "1";

                    element.style.transform =
                        "translateY(0)";

                }, 70 + index * 70);
            }
        );
    }


    /* =========================================================
       RENDER
       ========================================================= */

    function render() {

        updateOverview();

        updateAcademy();

        updateTestHistory();
    }


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            setupResetActions();

            render();

            revealDashboard();
        }
    );


    /* =========================================================
       UPDATE WHEN STORAGE CHANGES
       ========================================================= */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                STORAGE_KEYS.tests ||
                event.key ===
                STORAGE_KEYS.lessons ||
                event.key ===
                STORAGE_KEYS.progress
            ) {

                render();
            }
        }
    );


})();
    
