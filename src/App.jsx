import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dietService from './services/dietService';
import './index.css';

const todayISO = () => new Date().toISOString().split('T')[0];
const ACTIVITY_OPTIONS = ['Walking', 'Running', 'Swimming', 'Yoga'];
const cardClass = 'card shadow-sm border-0 h-100';
const formatShortDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const mealHeaderStyle = {
  backgroundColor: '#0f8a3d',
  color: '#fff',
  borderTopLeftRadius: '0.75rem',
  borderTopRightRadius: '0.75rem',
};

function MealForm({ editingMeal, onSubmit, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: todayISO(), mealType: 'BREAKFAST', foodName: '', calories: '' },
  });

  useEffect(() => {
    if (editingMeal) {
      reset({
        date: editingMeal.date,
        mealType: editingMeal.mealType,
        foodName: editingMeal.foodName,
        calories: editingMeal.calories,
      });
    } else {
      reset({ date: todayISO(), mealType: 'BREAKFAST', foodName: '', calories: '' });
    }
  }, [editingMeal, reset]);

  const submit = (data) => onSubmit({ ...data, calories: Number(data.calories) });

  return (
    <div className={`${cardClass}`}>
      <div style={mealHeaderStyle} className="px-4 py-3">
        <h5 className="mb-0 fw-bold">Add New Diet Record</h5>
        <small>Fill in the details to track your meal</small>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(submit)} className="needs-validation" noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Date</label>
            <input type="date" className="form-control" {...register('date', { required: 'Date is required' })} required />
            {errors.date && <div className="text-danger small mt-1">{errors.date.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Meal Type</label>
            <select className="form-select" {...register('mealType', { required: 'Meal type is required' })} required>
              <option value="BREAKFAST">Breakfast</option>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
            </select>
            {errors.mealType && <div className="text-danger small mt-1">{errors.mealType.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Food Item</label>
            <input
              type="text"
              className="form-control"
              {...register('foodName', { required: 'Food item is required', minLength: { value: 2, message: 'At least 2 characters' } })}
              required
            />
            {errors.foodName && <div className="text-danger small mt-1">{errors.foodName.message}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Calories</label>
            <input
              type="number"
              className="form-control"
              {...register('calories', { required: 'Calories are required', min: { value: 1, message: 'Must be at least 1' } })}
              required
            />
            {errors.calories && <div className="text-danger small mt-1">{errors.calories.message}</div>}
          </div>
          <div className="d-flex justify-content-end gap-2">
            {editingMeal && <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>}
            <button type="submit" disabled={isSubmitting} className="btn btn-success">
              {editingMeal ? 'Update Record' : 'Create Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ExerciseForm({ editingExercise, onSubmit, onCancel }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: todayISO(), activityName: ACTIVITY_OPTIONS[0], minutes: '' },
  });

  useEffect(() => {
    if (editingExercise) {
      reset({
        date: editingExercise.date,
        activityName: ACTIVITY_OPTIONS.includes(editingExercise.activityName) ? editingExercise.activityName : ACTIVITY_OPTIONS[0],
        minutes: editingExercise.minutes,
      });
    } else {
      reset({ date: todayISO(), activityName: ACTIVITY_OPTIONS[0], minutes: '' });
    }
  }, [editingExercise, reset]);

  const submit = (data) => {
    onSubmit({
      date: data.date,
      activityName: data.activityName,
      minutes: Number(data.minutes),
    });
  };

  return (
    <div className={cardClass}>
      <div style={mealHeaderStyle} className="px-4 py-3">
        <h5 className="mb-0 fw-bold">Add Exercise</h5>
        <small>Log your workouts and activities.</small>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Date</label>
            <input type="date" className="form-control" {...register('date', { required: 'Date is required' })} required />
            {errors.date && <div className="text-danger small mt-1">{errors.date.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Exercise & Activities</label>
            <select className="form-select" {...register('activityName', { required: 'Activity is required' })} required>
              {ACTIVITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.activityName && <div className="text-danger small mt-1">{errors.activityName.message}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Minutes</label>
            <input type="number" className="form-control" {...register('minutes', { required: 'Minutes are required', min: { value: 1, message: 'Must be at least 1' } })} required />
            {errors.minutes && <div className="text-danger small mt-1">{errors.minutes.message}</div>}
          </div>
          <div className="d-flex justify-content-end gap-2">
            {editingExercise && <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>}
            <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ backgroundColor: '#6a11cb', borderColor: '#6a11cb' }}>
              Save Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MealsTable({ meals, onEdit, onDelete }) {
  return (
    <div className={cardClass}>
      <div className="card-body">
        <h5 className="card-title mb-3">Recent Meals</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Meal Type</th>
                <th>Food Item</th>
                <th>Calories</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {meals.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No meals logged yet.</td>
                </tr>
              ) : (
                meals.map((meal) => (
                  <tr key={meal.id}>
                    <td>{new Date(meal.date).toLocaleDateString()}</td>
                    <td>{meal.mealType.charAt(0) + meal.mealType.slice(1).toLowerCase()}</td>
                    <td className="fw-semibold">{meal.foodName}</td>
                    <td>{meal.calories} kcal</td>
                    <td className="text-end">
                      <button onClick={() => onEdit(meal)} className="btn btn-sm btn-outline-primary me-2" title="Edit">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button onClick={() => onDelete(meal.id)} className="btn btn-sm btn-outline-danger" title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExerciseTable({ exercises, onEdit, onDelete }) {
  return (
    <div className={cardClass}>
      <div className="card-body">
        <h5 className="card-title mb-3">Exercise History</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Exercise & Activities</th>
                <th>Minutes</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exercises.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">No exercise logged yet.</td>
                </tr>
              ) : (
                exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td>{new Date(exercise.date).toLocaleDateString()}</td>
                    <td className="fw-semibold">{exercise.activityName}</td>
                    <td>{exercise.minutes} min</td>
                    <td className="text-end">
                      <button onClick={() => onEdit(exercise)} className="btn btn-sm btn-outline-primary me-2" title="Edit">
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button onClick={() => onDelete(exercise.id)} className="btn btn-sm btn-outline-danger" title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [meals, setMeals] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);
  const [editingExercise, setEditingExercise] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [mealsData, exerciseData] = await Promise.all([
        dietService.getMeals(),
        dietService.getExercises(),
      ]);
      setMeals(mealsData);
      setExercises(exerciseData);
    } catch (err) {
      console.error('Data load error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMealSubmit = async (data) => {
    try {
      if (editingMeal) {
        await dietService.updateMeal(editingMeal.id, data);
      } else {
        await dietService.createMeal(data);
      }
      setEditingMeal(null);
      loadData();
    } catch (err) {
      alert('Unable to save meal. Please try again.');
      console.error(err);
    }
  };

  const handleExerciseSubmit = async (data) => {
    try {
      if (editingExercise) {
        await dietService.updateExercise(editingExercise.id, data);
      } else {
        await dietService.createExercise(data);
      }
      setEditingExercise(null);
      loadData();
    } catch (err) {
      alert('Unable to save exercise. Please try again.');
      console.error(err);
    }
  };

  const deleteMeal = async (id) => {
    if (!window.confirm('Delete this meal?')) return;
    try {
      await dietService.deleteMeal(id);
      loadData();
    } catch (err) {
      alert('Failed to delete meal.');
      console.error(err);
    }
  };

  const deleteExercise = async (id) => {
    if (!window.confirm('Delete this exercise?')) return;
    try {
      await dietService.deleteExercise(id);
      loadData();
    } catch (err) {
      alert('Failed to delete exercise.');
      console.error(err);
    }
  };

  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories || 0), 0);
  const totalMeals = meals.length;
  const totalExerciseMinutes = exercises.reduce((sum, exercise) => sum + Number(exercise.minutes || 0), 0);
  const totalExercises = exercises.length;

  const latestMeal = meals.reduce((latest, meal) => (!latest || new Date(meal.date) > new Date(latest.date) ? meal : latest), null);
  const latestExercise = exercises.reduce((latest, exercise) => (!latest || new Date(exercise.date) > new Date(latest.date) ? exercise : latest), null);

  return (
    <div className="min-vh-100 bg-light">
      <header className="text-white py-4 shadow" style={{ background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' }}>
        <div className="container text-center">
          <h1 className="h3 mb-1">Diet & Lifestyle Tracker</h1>
          <p className="mb-0 text-light opacity-75">Balanced logging for meals and exercise.</p>
        </div>
      </header>

      <main className="container py-4">
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="dashboard-grid">
            <div className="stack gap-4 sticky-panel">
              <MealForm
                editingMeal={editingMeal}
                onSubmit={handleMealSubmit}
                onCancel={() => setEditingMeal(null)}
              />
              <ExerciseForm
                editingExercise={editingExercise}
                onSubmit={handleExerciseSubmit}
                onCancel={() => setEditingExercise(null)}
              />
            </div>

            <div className="stack gap-4">
              <div className="surface p-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <div>
                    <p className="section-eyebrow mb-1">Dashboard</p>
                    <h4 className="mb-0">Snapshot</h4>
                  </div>
                  <div className="text-muted small">Updated {new Date().toLocaleString()}</div>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Total Calories</div>
                    <div className="stat-value text-success">{totalCalories.toLocaleString()} kcal</div>
                    <div className="stat-sub">Across {totalMeals || 'no'} meals</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Workout Minutes</div>
                    <div className="stat-value text-primary">{totalExerciseMinutes.toLocaleString()} min</div>
                    <div className="stat-sub">From {totalExercises || 'no'} sessions</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Latest Meal</div>
                    <div className="stat-value text-truncate" title={latestMeal ? latestMeal.foodName : 'No meals yet'}>
                      {latestMeal ? latestMeal.foodName : 'No meals yet'}
                    </div>
                    <div className="stat-sub">
                      {latestMeal ? `${formatShortDate(latestMeal.date)} · ${latestMeal.mealType.charAt(0) + latestMeal.mealType.slice(1).toLowerCase()}` : 'Add a meal to start'}
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Latest Exercise</div>
                    <div className="stat-value text-truncate" title={latestExercise ? latestExercise.activityName : 'No exercise yet'}>
                      {latestExercise ? latestExercise.activityName : 'No exercise yet'}
                    </div>
                    <div className="stat-sub">
                      {latestExercise ? `${formatShortDate(latestExercise.date)} · ${latestExercise.minutes} min` : 'Log a session to start'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-grid">
                <MealsTable
                  meals={meals}
                  onEdit={(meal) => setEditingMeal(meal)}
                  onDelete={deleteMeal}
                />
                <ExerciseTable
                  exercises={exercises}
                  onEdit={(exercise) => setEditingExercise(exercise)}
                  onDelete={deleteExercise}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
