package ua.nure.cache.java.entity;

public class SourceField {
		
		private String variable;
		
		private Objekt object;
		
		@Override
		public boolean equals(Object obj) {
			SourceField o = (SourceField) obj;
			if (o.getVariable().equals(this.getVariable())) {
				return true;
			}
			return false;
		}

		public String getVariable() {
			return variable;
		}

		public void setVariable(String variable) {
			this.variable = variable;
		}

		public Objekt getObject() {
			return object;
		}

		public void setObject(Objekt object) {
			this.object = object;
		}
		
}
